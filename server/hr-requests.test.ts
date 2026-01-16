import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { getDb } from "./db";
import type { TrpcContext } from "./_core/trpc";

describe("HR Request Approval System", () => {
  let db: Awaited<ReturnType<typeof getDb>>;
  let testEmployeeId: number;
  let testRequestId: number;

  beforeEach(async () => {
    db = await getDb();
    if (!db) throw new Error("Database not available");

    // Create test employee
    const { employees } = await import("../drizzle/schema");
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash("testpass123", 10);
    
    const [employee] = await db.insert(employees).values({
      username: `testemployee_${Date.now()}`,
      password: hashedPassword,
      name: "Test Employee",
      email: `test${Date.now()}@example.com`,
      department: "Engineering",
      role: "employee",
    });
    
    testEmployeeId = employee.insertId;

    // Create test request
    const { employeeRequests } = await import("../drizzle/schema");
    const [request] = await db.insert(employeeRequests).values({
      employeeId: testEmployeeId,
      employeeName: "Test Employee",
      department: "Engineering",
      requestType: "vacation",
      title: "Annual Leave Request",
      description: "Requesting 5 days annual leave",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-03-05"),
      status: "pending",
    });

    testRequestId = request.insertId;
  });

  it("should get all employee requests", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    } as TrpcContext);

    const requests = await caller.employeeRequests.getAll();
    
    expect(requests).toBeDefined();
    expect(Array.isArray(requests)).toBe(true);
    expect(requests.length).toBeGreaterThan(0);
    
    const testRequest = requests.find(r => r.id === testRequestId);
    expect(testRequest).toBeDefined();
    expect(testRequest?.status).toBe("pending");
  });

  it("should approve an employee request", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    } as TrpcContext);

    const result = await caller.employeeRequests.approve({
      requestId: testRequestId,
      hrNotes: "Approved - sufficient leave balance",
      reviewedBy: 1,
      reviewedByName: "HR Manager",
    });

    expect(result.success).toBe(true);

    // Verify the request was approved
    const { employeeRequests } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [updatedRequest] = await db!.select().from(employeeRequests)
      .where(eq(employeeRequests.id, testRequestId));

    expect(updatedRequest.status).toBe("approved");
    expect(updatedRequest.hrNotes).toBe("Approved - sufficient leave balance");
    expect(updatedRequest.reviewedBy).toBe(1);
    expect(updatedRequest.reviewedByName).toBe("HR Manager");
    expect(updatedRequest.reviewedAt).toBeDefined();
  });

  it("should reject an employee request", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    } as TrpcContext);

    const result = await caller.employeeRequests.reject({
      requestId: testRequestId,
      hrNotes: "Rejected - insufficient leave balance",
      reviewedBy: 1,
      reviewedByName: "HR Manager",
    });

    expect(result.success).toBe(true);

    // Verify the request was rejected
    const { employeeRequests } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [updatedRequest] = await db!.select().from(employeeRequests)
      .where(eq(employeeRequests.id, testRequestId));

    expect(updatedRequest.status).toBe("rejected");
    expect(updatedRequest.hrNotes).toBe("Rejected - insufficient leave balance");
    expect(updatedRequest.reviewedBy).toBe(1);
    expect(updatedRequest.reviewedByName).toBe("HR Manager");
    expect(updatedRequest.reviewedAt).toBeDefined();
  });

  it("should track approval timestamp", async () => {
    const beforeApproval = new Date();
    
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    } as TrpcContext);

    await caller.employeeRequests.approve({
      requestId: testRequestId,
      hrNotes: "Approved",
      reviewedBy: 1,
      reviewedByName: "HR Manager",
    });

    const afterApproval = new Date();

    // Verify the timestamp is within the expected range
    const { employeeRequests } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [updatedRequest] = await db!.select().from(employeeRequests)
      .where(eq(employeeRequests.id, testRequestId));

    expect(updatedRequest.reviewedAt).toBeDefined();
    const reviewedAt = new Date(updatedRequest.reviewedAt!);
    expect(reviewedAt.getTime()).toBeGreaterThanOrEqual(beforeApproval.getTime());
    expect(reviewedAt.getTime()).toBeLessThanOrEqual(afterApproval.getTime());
  });

  it("should allow optional HR notes on approval", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    } as TrpcContext);

    const result = await caller.employeeRequests.approve({
      requestId: testRequestId,
      reviewedBy: 1,
      reviewedByName: "HR Manager",
    });

    expect(result.success).toBe(true);

    // Verify the request was approved without notes
    const { employeeRequests } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [updatedRequest] = await db!.select().from(employeeRequests)
      .where(eq(employeeRequests.id, testRequestId));

    expect(updatedRequest.status).toBe("approved");
    expect(updatedRequest.hrNotes).toBeNull();
  });
});

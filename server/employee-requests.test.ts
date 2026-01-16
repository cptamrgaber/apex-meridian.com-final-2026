import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { employees, employeeRequests } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Employee Request System", () => {
  let testEmployeeId: number;

  beforeAll(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    // Create a test employee
    await db
      .insert(employees)
      .values({
        username: "testemployee",
        name: "Test Employee",
        email: "test.employee@apex-meridian.com",
        password: "test123",
        department: "Engineering",
        isActive: 1,
      });

    // Retrieve the created employee
    const result = await db
      .select()
      .from(employees)
      .where(eq(employees.email, "test.employee@apex-meridian.com"));

    testEmployeeId = result[0].id;
  });

  it("should create a vacation request", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const requestData = {
      employeeId: testEmployeeId,
      employeeName: "Test Employee",
      department: "Engineering",
      requestType: "vacation" as const,
      title: "Annual Leave",
      description: "Taking annual vacation for family time",
      startDate: new Date("2026-02-01"),
      endDate: new Date("2026-02-15"),
      status: "pending" as const,
    };

    await db.insert(employeeRequests).values(requestData);

    // Retrieve the created request
    const result = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.title, "Annual Leave"));

    expect(result).toHaveLength(1);
    expect(result[0].employeeId).toBe(testEmployeeId);
    expect(result[0].requestType).toBe("vacation");
    expect(result[0].status).toBe("pending");
    expect(result[0].title).toBe("Annual Leave");
  });

  it("should create a duty assignment request", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const requestData = {
      employeeId: testEmployeeId,
      employeeName: "Test Employee",
      department: "Engineering",
      requestType: "duty_assignment" as const,
      title: "Client Site Visit",
      description: "Assignment to client site for system integration\nAssignment Type: On-site\nLocation: Cairo Airport",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-03-05"),
      status: "pending" as const,
    };

    await db.insert(employeeRequests).values(requestData);

    // Retrieve the created request
    const result = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.title, "Client Site Visit"));

    expect(result).toHaveLength(1);
    expect(result[0].requestType).toBe("duty_assignment");
    expect(result[0].description).toContain("Assignment Type: On-site");
    expect(result[0].description).toContain("Location: Cairo Airport");
  });

  it("should create a report submission request", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const requestData = {
      employeeId: testEmployeeId,
      employeeName: "Test Employee",
      department: "Engineering",
      requestType: "report" as const,
      title: "Monthly Progress Report",
      description: "Submitting monthly progress report for Q1 2026",
      startDate: null,
      endDate: null,
      status: "pending" as const,
    };

    await db.insert(employeeRequests).values(requestData);

    // Retrieve the created request
    const result = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.title, "Monthly Progress Report"));

    expect(result).toHaveLength(1);
    expect(result[0].requestType).toBe("report");
    expect(result[0].startDate).toBeNull();
    expect(result[0].endDate).toBeNull();
  });

  it("should retrieve all requests for an employee", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const requests = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.employeeId, testEmployeeId));

    expect(requests.length).toBeGreaterThanOrEqual(3); // At least the 3 we created above
    expect(requests.every((r) => r.employeeId === testEmployeeId)).toBe(true);
  });

  it("should filter requests by type", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const vacationRequests = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.requestType, "vacation"));

    expect(vacationRequests.length).toBeGreaterThanOrEqual(1);
    expect(vacationRequests.every((r) => r.requestType === "vacation")).toBe(true);
  });

  it("should filter requests by status", async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const pendingRequests = await db
      .select()
      .from(employeeRequests)
      .where(eq(employeeRequests.status, "pending"));

    expect(pendingRequests.length).toBeGreaterThanOrEqual(3);
    expect(pendingRequests.every((r) => r.status === "pending")).toBe(true);
  });
});

import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { authenticateEmployee } from "./employeeDb";

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "http",
      headers: {},
      cookies: {},
    } as any,
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as any,
  };
}

describe("Employee Authentication System", () => {
  it("should have employee router with required procedures", () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Verify employee router exists with all required procedures
    expect(caller.employee).toBeDefined();
    expect(caller.employee.login).toBeDefined();
    expect(caller.employee.logout).toBeDefined();
    expect(caller.employee.me).toBeDefined();
    expect(caller.employee.list).toBeDefined();
    expect(caller.employee.create).toBeDefined();
    expect(caller.employee.update).toBeDefined();
    expect(caller.employee.delete).toBeDefined();
    expect(caller.employee.toggleStatus).toBeDefined();
  });

  it("should return null for unauthenticated employee.me query", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.employee.me();
    expect(result).toBeNull();
  });

  it("should successfully logout employee", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.employee.logout();
    expect(result.success).toBe(true);
  });

  it("should list employees (returns array)", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.employee.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should authenticate admin user with correct credentials", async () => {
    const employee = await authenticateEmployee('admin', 'admin123');
    
    expect(employee).not.toBeNull();
    expect(employee?.username).toBe('admin');
    expect(employee?.role).toBe('admin');
    expect(employee?.name).toBe('System Administrator');
  });

  it("should reject authentication with incorrect password", async () => {
    const employee = await authenticateEmployee('admin', 'wrongpassword');
    
    expect(employee).toBeNull();
  });

  it("should reject authentication with non-existent user", async () => {
    const employee = await authenticateEmployee('nonexistent', 'password');
    
    expect(employee).toBeNull();
  });
});

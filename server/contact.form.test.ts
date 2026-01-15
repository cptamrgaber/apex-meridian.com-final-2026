import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("Contact Form", () => {
  it("should have contact router with submit procedure", () => {
    expect(appRouter.contact).toBeDefined();
    expect(appRouter.contact.submit).toBeDefined();
  });

  it("should validate required fields", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    // Test with missing name
    await expect(
      caller.contact.submit({
        name: "",
        email: "test@example.com",
        subject: "Test",
        message: "Test message that is long enough",
      })
    ).rejects.toThrow();

    // Test with invalid email
    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "invalid-email",
        subject: "Test",
        message: "Test message that is long enough",
      })
    ).rejects.toThrow();

    // Test with short message
    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "test@example.com",
        subject: "Test",
        message: "Short",
      })
    ).rejects.toThrow();
  });
});

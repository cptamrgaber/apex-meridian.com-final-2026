import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  authenticateEmployee,
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
} from "./employeeDb";
import { sendContactEmail } from "./email";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Employee authentication and management
  employee: router({
    login: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const employee = await authenticateEmployee(input.username, input.password);
        
        if (!employee) {
          throw new Error("Invalid username or password");
        }

        // Store employee session in cookie
        const sessionData = {
          id: employee.id,
          username: employee.username,
          name: employee.name,
          role: employee.role,
        };

        // Set cookie with employee session
        ctx.res.cookie('employee_session', JSON.stringify(sessionData), {
          httpOnly: true,
          secure: ctx.req.protocol === 'https',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return {
          success: true,
          employee: {
            id: employee.id,
            username: employee.username,
            name: employee.name,
            email: employee.email,
            department: employee.department,
            role: employee.role,
          },
        };
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie('employee_session');
      return { success: true };
    }),

    me: publicProcedure.query(({ ctx }) => {
      const cookie = ctx.req.cookies?.employee_session;
      if (!cookie) return null;
      
      try {
        return JSON.parse(cookie);
      } catch {
        return null;
      }
    }),

    // Admin-only procedures
    list: publicProcedure.query(async () => {
      const employees = await getAllEmployees();
      return employees.map(e => ({
        id: e.id,
        username: e.username,
        name: e.name,
        email: e.email,
        department: e.department,
        role: e.role,
        isActive: e.isActive,
        createdAt: e.createdAt,
        lastLogin: e.lastLogin,
      }));
    }),

    create: publicProcedure
      .input(z.object({
        username: z.string(),
        password: z.string(),
        name: z.string(),
        email: z.string().email(),
        department: z.string().optional(),
        role: z.enum(["admin", "employee", "hr"]),
      }))
      .mutation(async ({ input }) => {
        await createEmployee(input);
        return { success: true };
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        department: z.string().optional(),
        role: z.enum(["admin", "employee", "hr"]).optional(),
        password: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateEmployee(id, data);
        return { success: true };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteEmployee(input.id);
        return { success: true };
      }),

    toggleStatus: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await toggleEmployeeStatus(input.id);
        return { success: true };
      }),
  }),

  // Contact form
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        company: z.string().optional(),
        phone: z.string().optional(),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        const result = await sendContactEmail(input);
        
        if (!result.success) {
          throw new Error(result.error || "Failed to send email");
        }
        
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

export function registerSimpleAuthRoutes(app: Express) {
  // Simple login endpoint for direct authentication
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // Simple password check (in production, use proper auth)
    if (password !== "ApexMeridian2026!") {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    try {
      const openId = email || "admin@apex-meridian.com";
      const name = email?.split("@")[0] || "Admin";
      
      await db.upsertUser({
        openId,
        name,
        email: openId,
        loginMethod: "password",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name,
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ success: true, user: { openId, name, email: openId } });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME);
    res.json({ success: true });
  });

  // Check auth status
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      res.json({ authenticated: true, user });
    } catch (error) {
      res.json({ authenticated: false });
    }
  });
}

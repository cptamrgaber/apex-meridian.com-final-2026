import { getDb } from "./db";
import { sql } from "drizzle-orm";

export interface HealthCheckResult {
  service: string;
  status: "healthy" | "degraded" | "down";
  message: string;
  responseTime?: number;
  lastChecked: string;
}

export interface SystemHealth {
  overall: "healthy" | "degraded" | "down";
  checks: HealthCheckResult[];
  timestamp: string;
}

/**
 * Check database connectivity and performance
 */
export async function checkDatabaseHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    // Simple query to test connection
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection is null");
    }
    await db.execute(sql`SELECT 1`);
    
    const responseTime = Date.now() - startTime;
    
    return {
      service: "Database",
      status: responseTime < 100 ? "healthy" : "degraded",
      message: responseTime < 100 
        ? "Database is responding normally" 
        : "Database response time is slow",
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: "Database",
      status: "down",
      message: `Database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      responseTime: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Check email service availability
 */
export async function checkEmailHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return {
        service: "Email Service",
        status: "down",
        message: "Resend API key not configured",
        lastChecked: new Date().toISOString(),
      };
    }
    
    // Basic validation - just check if key exists and has correct format
    if (!apiKey.startsWith("re_")) {
      return {
        service: "Email Service",
        status: "degraded",
        message: "Resend API key format appears invalid",
        lastChecked: new Date().toISOString(),
      };
    }
    
    const responseTime = Date.now() - startTime;
    
    return {
      service: "Email Service",
      status: "healthy",
      message: "Email service is configured and ready",
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: "Email Service",
      status: "down",
      message: `Email service check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      responseTime: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Check server health and resources
 */
export async function checkServerHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    // Check memory usage
    const memUsage = process.memoryUsage();
    const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);
    const memPercent = Math.round((memUsedMB / memTotalMB) * 100);
    
    // Check uptime
    const uptimeSeconds = process.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    
    const responseTime = Date.now() - startTime;
    
    let status: "healthy" | "degraded" | "down" = "healthy";
    let message = `Server running normally. Memory: ${memUsedMB}MB/${memTotalMB}MB (${memPercent}%). Uptime: ${uptimeHours}h`;
    
    if (memPercent > 80) {
      status = "degraded";
      message = `High memory usage: ${memPercent}%. Consider restarting server.`;
    }
    
    return {
      service: "Server",
      status,
      message,
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: "Server",
      status: "down",
      message: `Server health check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      responseTime: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Check authentication service
 */
export async function checkAuthHealth(): Promise<HealthCheckResult> {
  const startTime = Date.now();
  
  try {
    // Check if OAuth environment variables are set
    const oauthUrl = process.env.OAUTH_SERVER_URL;
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!oauthUrl || !jwtSecret) {
      return {
        service: "Authentication",
        status: "down",
        message: "OAuth configuration missing",
        lastChecked: new Date().toISOString(),
      };
    }
    
    const responseTime = Date.now() - startTime;
    
    return {
      service: "Authentication",
      status: "healthy",
      message: "Authentication service is configured",
      responseTime,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    return {
      service: "Authentication",
      status: "down",
      message: `Auth service check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      responseTime: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Run all health checks and return system status
 */
export async function getSystemHealth(): Promise<SystemHealth> {
  const checks = await Promise.all([
    checkDatabaseHealth(),
    checkEmailHealth(),
    checkServerHealth(),
    checkAuthHealth(),
  ]);
  
  // Determine overall status
  const hasDown = checks.some((c) => c.status === "down");
  const hasDegraded = checks.some((c) => c.status === "degraded");
  
  let overall: "healthy" | "degraded" | "down" = "healthy";
  if (hasDown) overall = "down";
  else if (hasDegraded) overall = "degraded";
  
  return {
    overall,
    checks,
    timestamp: new Date().toISOString(),
  };
}

import { eq } from "drizzle-orm";
import { employees, type Employee, type InsertEmployee } from "../drizzle/schema";
import { getDb } from "./db";
import crypto from "crypto";

// Simple password hashing (in production, use bcrypt)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function authenticateEmployee(username: string, password: string): Promise<Employee | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(employees)
    .where(eq(employees.username, username))
    .limit(1);

  if (result.length === 0) return null;

  const employee = result[0];
  
  if (!employee.isActive) return null;
  
  if (!verifyPassword(password, employee.password)) return null;

  // Update last login
  await db
    .update(employees)
    .set({ lastLogin: new Date() })
    .where(eq(employees.id, employee.id));

  return employee;
}

export async function getAllEmployees() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(employees);
}

export async function getEmployeeById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(employees)
    .where(eq(employees.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createEmployee(data: InsertEmployee) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const hashedPassword = hashPassword(data.password);

  await db.insert(employees).values({
    ...data,
    password: hashedPassword,
  });

  return true;
}

export async function updateEmployee(id: number, data: Partial<InsertEmployee>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = { ...data };
  
  if (data.password) {
    updateData.password = hashPassword(data.password);
  }

  await db
    .update(employees)
    .set(updateData)
    .where(eq(employees.id, id));

  return true;
}

export async function deleteEmployee(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .delete(employees)
    .where(eq(employees.id, id));

  return true;
}

export async function toggleEmployeeStatus(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const employee = await getEmployeeById(id);
  if (!employee) throw new Error("Employee not found");

  await db
    .update(employees)
    .set({ isActive: employee.isActive ? 0 : 1 })
    .where(eq(employees.id, id));

  return true;
}

import crypto from "crypto";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { employees } from "./drizzle/schema.ts";

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const result = await db
  .select()
  .from(employees)
  .where(eq(employees.username, 'admin'))
  .limit(1);

if (result.length > 0) {
  const admin = result[0];
  console.log("Admin user found:");
  console.log("  ID:", admin.id);
  console.log("  Username:", admin.username);
  console.log("  Name:", admin.name);
  console.log("  Email:", admin.email);
  console.log("  Role:", admin.role);
  console.log("  IsActive:", admin.isActive);
  console.log("  Password hash:", admin.password);
  console.log("\nExpected hash for 'admin123':", hashPassword('admin123'));
  console.log("Hashes match:", admin.password === hashPassword('admin123'));
} else {
  console.log("No admin user found!");
}

await connection.end();

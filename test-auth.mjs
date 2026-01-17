import crypto from "crypto";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { employees } from "./drizzle/schema.ts";

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const username = 'admin';
const password = 'admin123';

console.log('Testing authentication for:', username);
console.log('Password:', password);
console.log('Expected hash:', hashPassword(password));

const result = await db
  .select()
  .from(employees)
  .where(eq(employees.username, username))
  .limit(1);

if (result.length === 0) {
  console.log('❌ User not found');
} else {
  const employee = result[0];
  console.log('\n✓ User found:');
  console.log('  Username:', employee.username);
  console.log('  Name:', employee.name);
  console.log('  IsActive:', employee.isActive);
  console.log('  Stored hash:', employee.password);
  
  if (!employee.isActive) {
    console.log('\n❌ User is not active');
  } else {
    console.log('\n✓ User is active');
  }
  
  const passwordMatch = verifyPassword(password, employee.password);
  console.log('\nPassword verification:');
  console.log('  Input password hash:', hashPassword(password));
  console.log('  Stored password hash:', employee.password);
  console.log('  Match:', passwordMatch ? '✓ YES' : '❌ NO');
  
  if (passwordMatch) {
    console.log('\n✅ Authentication would succeed');
  } else {
    console.log('\n❌ Authentication would fail');
  }
}

await connection.end();

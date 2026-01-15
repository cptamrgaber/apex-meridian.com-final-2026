import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { employees } from '../drizzle/schema';
import crypto from 'crypto';

// Simple password hashing function (in production, use bcrypt)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedAdmin() {
  const db = drizzle(process.env.DATABASE_URL);
  
  try {
    // Check if admin already exists
    const existingAdmin = await db.select().from(employees).where(eq(employees.username, 'admin')).limit(1);
    
    if (existingAdmin.length > 0) {
      console.log('✓ Admin account already exists');
      return;
    }
    
    // Create default admin account
    await db.insert(employees).values({
      username: 'admin',
      password: hashPassword('admin'),
      name: 'System Administrator',
      email: 'admin@apex-meridian.com',
      department: 'IT',
      role: 'admin',
      isActive: 1
    });
    
    console.log('✓ Default admin account created successfully');
    console.log('  Username: admin');
    console.log('  Password: admin');
    console.log('  Please change the password after first login!');
  } catch (error) {
    console.error('✗ Error creating admin account:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

seedAdmin();

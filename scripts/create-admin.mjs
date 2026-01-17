import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '../drizzle/schema.js';
import bcrypt from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function createAdmin() {
  console.log('Connecting to database...');
  
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });

  console.log('Creating admin user...');
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  try {
    await db.insert(schema.employees).values({
      username: 'admin',
      email: 'admin@apex-meridian.com',
      password: hashedPassword,
      name: 'System Administrator',
      department: 'IT',
      position: 'System Administrator',
      role: 'admin',
      status: 'active',
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@apex-meridian.com');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('ℹ️  Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
      process.exit(1);
    }
  }
  
  await connection.end();
  console.log('Done!');
}

createAdmin();

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('Seeding users...');
  
  // Delete existing records
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  
  // Create admin user
  const adminHashedPassword = await bcrypt.hash('Admin123!', 10);
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@bitex.com',
      hashedPassword: adminHashedPassword,
      image: '/images/images/defaultUser.png'
    }
  });
  
  // Create regular user
  const userHashedPassword = await bcrypt.hash('User123!', 10);
  await prisma.user.create({
    data: {
      name: 'Khách hàng',
      email: 'customer@example.com',
      hashedPassword: userHashedPassword,
      image: '/images/images/defaultUser.png'
    }
  });
  
  console.log('Users seeded successfully!');
}
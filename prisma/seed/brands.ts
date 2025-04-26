import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBrands() {
  console.log('Seeding brands...');
  
  // Delete existing records
  await prisma.brand.deleteMany();
  
  // Create brands
  await prisma.brand.createMany({
    data: [
      { name: 'Apple' },
      { name: 'Samsung' },
      { name: 'Xiaomi' },
      { name: 'ASUS' },
      { name: 'Acer' },
      { name: 'Dell' },
      { name: 'HP' },
      { name: 'Lenovo' },
      { name: 'MSI' },
      { name: 'Sony' },
      { name: 'LG' },
      { name: 'Huawei' },
      { name: 'Oppo' },
      { name: 'Vivo' },
      { name: 'Logitech' },
      { name: 'DJI' },
      { name: 'Intel' },
      { name: 'AMD' },
      { name: 'NVIDIA' },
      { name: 'Microsoft' },
      { name: 'Razer' },
      { name: 'SteelSeries' },
      { name: 'HyperX' },
      { name: 'Corsair' }
    ]
  });
  
  console.log('Brands seeded successfully!');
}
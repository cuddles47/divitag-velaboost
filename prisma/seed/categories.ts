import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
  console.log('Seeding categories...');
  
  // Delete existing records
  await prisma.category.deleteMany();
  
  // Main categories
  const smartphones = await prisma.category.create({
    data: {
      name: 'Điện thoại',
      url: 'smartphones',
      iconUrl: '/icons/phoneIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  const laptops = await prisma.category.create({
    data: {
      name: 'Laptop',
      url: 'laptops',
      iconUrl: '/icons/computerIcon.svg',
      iconSize: [24, 24]
    }
  });
  
  const tablets = await prisma.category.create({
    data: {
      name: 'Máy tính bảng',
      url: 'tablets',
      iconUrl: '/icons/tabletIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  const watches = await prisma.category.create({
    data: {
      name: 'Đồng hồ thông minh',
      url: 'smartwatches',
      iconUrl: '/icons/watchIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  const accessories = await prisma.category.create({
    data: {
      name: 'Phụ kiện',
      url: 'accessories',
      iconUrl: '/icons/otherCatIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  const pcComponents = await prisma.category.create({
    data: {
      name: 'Linh kiện PC',
      url: 'pc-components',
      iconUrl: '/icons/pcComponentIcon.svg',
      iconSize: [24, 24]
    }
  });
  
  const gaming = await prisma.category.create({
    data: {
      name: 'Gaming',
      url: 'gaming',
      iconUrl: '/icons/gameIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  // Subcategories
  // Smartphone subcategories
  await prisma.category.create({
    data: {
      parentID: smartphones.id,
      name: 'Điện thoại Apple',
      url: 'apple-phones',
      iconUrl: '/icons/phoneIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  await prisma.category.create({
    data: {
      parentID: smartphones.id,
      name: 'Điện thoại Samsung',
      url: 'samsung-phones',
      iconUrl: '/icons/phoneIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  // Laptop subcategories
  await prisma.category.create({
    data: {
      parentID: laptops.id,
      name: 'Laptop Gaming',
      url: 'gaming-laptops',
      iconUrl: '/icons/computerIcon.svg',
      iconSize: [24, 24]
    }
  });
  
  await prisma.category.create({
    data: {
      parentID: laptops.id,
      name: 'Laptop Văn Phòng',
      url: 'office-laptops',
      iconUrl: '/icons/computerIcon.svg',
      iconSize: [24, 24]
    }
  });
  
  // Accessories subcategories
  await prisma.category.create({
    data: {
      parentID: accessories.id,
      name: 'Tai nghe',
      url: 'headphones',
      iconUrl: '/icons/musicIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  await prisma.category.create({
    data: {
      parentID: accessories.id,
      name: 'Chuột',
      url: 'mouse',
      iconUrl: '/icons/mouseIcon.svg',
      iconSize: [20, 20]
    }
  });
  
  console.log('Categories seeded successfully!');
}
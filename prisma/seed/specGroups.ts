import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSpecGroups() {
  console.log('Seeding spec groups...');
  
  // Delete existing records
  await prisma.specGroup.deleteMany();
  
  // Create spec groups
  await prisma.specGroup.create({
    data: {
      title: 'Màn hình',
      specs: [
        'Kích thước màn hình',
        'Công nghệ màn hình',
        'Độ phân giải',
        'Tần số quét',
        'Độ sáng tối đa'
      ]
    }
  });
  
  await prisma.specGroup.create({
    data: {
      title: 'Hiệu năng',
      specs: [
        'Chipset',
        'CPU',
        'GPU',
        'RAM',
        'Bộ nhớ trong'
      ]
    }
  });
  
  await prisma.specGroup.create({
    data: {
      title: 'Camera',
      specs: [
        'Camera chính',
        'Camera phụ',
        'Camera selfie',
        'Quay video',
        'Tính năng camera'
      ]
    }
  });
  
  await prisma.specGroup.create({
    data: {
      title: 'Pin & Sạc',
      specs: [
        'Dung lượng pin',
        'Công nghệ sạc',
        'Công suất sạc tối đa',
        'Sạc không dây'
      ]
    }
  });
  
  await prisma.specGroup.create({
    data: {
      title: 'Kết nối',
      specs: [
        'Wi-Fi',
        'Bluetooth',
        'GPS',
        'NFC',
        'Cổng kết nối'
      ]
    }
  });
  
  await prisma.specGroup.create({
    data: {
      title: 'Chung',
      specs: [
        'Kích thước',
        'Trọng lượng',
        'Chất liệu',
        'Khả năng chống nước, bụi',
        'Ngày ra mắt'
      ]
    }
  });
  
  console.log('Spec groups seeded successfully!');
}
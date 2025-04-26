import { PrismaClient, OptionSetType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedOptionSets() {
  console.log('Seeding option sets...');
  
  // Delete existing records
  await prisma.optionSet.deleteMany();
  
  // Create color options
  await prisma.optionSet.create({
    data: {
      name: 'Màu sắc',
      type: OptionSetType.COLOR,
      options: [
        { name: 'Đen', value: '#000000' },
        { name: 'Trắng', value: '#FFFFFF' },
        { name: 'Xanh dương', value: '#0000FF' },
        { name: 'Xanh lá', value: '#00FF00' },
        { name: 'Đỏ', value: '#FF0000' },
        { name: 'Vàng', value: '#FFFF00' },
        { name: 'Tím', value: '#800080' },
        { name: 'Bạc', value: '#C0C0C0' },
        { name: 'Vàng hồng', value: '#FFB6C1' }
      ]
    }
  });

  // Create storage options
  await prisma.optionSet.create({
    data: {
      name: 'Bộ nhớ',
      type: OptionSetType.TEXT,
      options: [
        { name: '64GB', value: '64' },
        { name: '128GB', value: '128' },
        { name: '256GB', value: '256' },
        { name: '512GB', value: '512' },
        { name: '1TB', value: '1024' },
        { name: '2TB', value: '2048' }
      ]
    }
  });

  // Create RAM options
  await prisma.optionSet.create({
    data: {
      name: 'RAM',
      type: OptionSetType.TEXT,
      options: [
        { name: '4GB', value: '4' },
        { name: '8GB', value: '8' },
        { name: '16GB', value: '16' },
        { name: '32GB', value: '32' },
        { name: '64GB', value: '64' }
      ]
    }
  });

  // Create screen size options
  await prisma.optionSet.create({
    data: {
      name: 'Kích thước màn hình',
      type: OptionSetType.TEXT,
      options: [
        { name: '13 inch', value: '13' },
        { name: '14 inch', value: '14' },
        { name: '15.6 inch', value: '15.6' },
        { name: '16 inch', value: '16' },
        { name: '17.3 inch', value: '17.3' }
      ]
    }
  });
  
  console.log('Option sets seeded successfully!');
}
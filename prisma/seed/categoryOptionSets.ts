import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategoryOptionSets() {
  console.log('Seeding category option sets...');
  
  // Delete existing records
  await prisma.category_OptionSet.deleteMany();
  
  // Get categories
  const smartphones = await prisma.category.findFirst({
    where: { url: 'smartphones', parentID: null }
  });
  
  const laptops = await prisma.category.findFirst({
    where: { url: 'laptops', parentID: null }
  });
  
  const tablets = await prisma.category.findFirst({
    where: { url: 'tablets', parentID: null }
  });
  
  // Get option sets
  const colorOptionSet = await prisma.optionSet.findFirst({
    where: { name: 'Màu sắc' }
  });
  
  const storageOptionSet = await prisma.optionSet.findFirst({
    where: { name: 'Bộ nhớ' }
  });
  
  const ramOptionSet = await prisma.optionSet.findFirst({
    where: { name: 'RAM' }
  });
  
  const screenSizeOptionSet = await prisma.optionSet.findFirst({
    where: { name: 'Kích thước màn hình' }
  });
  
  // Link categories with option sets
  if (smartphones && colorOptionSet && storageOptionSet) {
    await prisma.category_OptionSet.create({
      data: {
        categoryID: smartphones.id,
        optionID: colorOptionSet.id
      }
    });
    
    await prisma.category_OptionSet.create({
      data: {
        categoryID: smartphones.id,
        optionID: storageOptionSet.id
      }
    });
  }
  
  if (laptops && colorOptionSet && ramOptionSet && screenSizeOptionSet && storageOptionSet) {
    await prisma.category_OptionSet.create({
      data: {
        categoryID: laptops.id,
        optionID: colorOptionSet.id
      }
    });
    
    await prisma.category_OptionSet.create({
      data: {
        categoryID: laptops.id,
        optionID: ramOptionSet.id
      }
    });
    
    await prisma.category_OptionSet.create({
      data: {
        categoryID: laptops.id,
        optionID: screenSizeOptionSet.id
      }
    });
    
    await prisma.category_OptionSet.create({
      data: {
        categoryID: laptops.id,
        optionID: storageOptionSet.id
      }
    });
  }
  
  if (tablets && colorOptionSet && storageOptionSet) {
    await prisma.category_OptionSet.create({
      data: {
        categoryID: tablets.id,
        optionID: colorOptionSet.id
      }
    });
    
    await prisma.category_OptionSet.create({
      data: {
        categoryID: tablets.id,
        optionID: storageOptionSet.id
      }
    });
  }
  
  console.log('Category option sets seeded successfully!');
}
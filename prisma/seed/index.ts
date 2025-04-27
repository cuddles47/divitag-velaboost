import { PrismaClient } from '@prisma/client';
import { seedCategories } from './categories';
import { seedBrands } from './brands';
import { seedOptionSets } from './optionSets';
import { seedSpecGroups } from './specGroups';
import { seedProducts } from './products';
import { seedUsers } from './users';
import { seedCategoryOptionSets } from './categoryOptionSets';
import { seedCategorySpecGroups } from './categorySpecGroups';

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding...`);

    // Seed data in order of dependencies
    await seedUsers();
    await seedCategories();
    await seedBrands();
    await seedOptionSets();
    await seedSpecGroups();
    await seedCategoryOptionSets();
    await seedCategorySpecGroups();
    await seedProducts();

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategorySpecGroups() {
    console.log('Seeding category spec groups...');

    // Delete existing records
    await prisma.category_SpecGroup.deleteMany();

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

    // Get spec groups
    const displaySpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Màn hình' }
    });

    const performanceSpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Hiệu năng' }
    });

    const cameraSpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Camera' }
    });

    const batterySpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Pin & Sạc' }
    });

    const connectivitySpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Kết nối' }
    });

    const generalSpecGroup = await prisma.specGroup.findFirst({
        where: { title: 'Chung' }
    });

    // Link categories with spec groups
    if (smartphones) {
        // Add all spec groups to smartphones
        const specGroups = [
            displaySpecGroup,
            performanceSpecGroup,
            cameraSpecGroup,
            batterySpecGroup,
            connectivitySpecGroup,
            generalSpecGroup
        ];

        for (const specGroup of specGroups) {
            if (specGroup) {
                await prisma.category_SpecGroup.create({
                    data: {
                        categoryID: smartphones.id,
                        specGroupID: specGroup.id
                    }
                });
            }
        }
    }

    if (laptops) {
        // Add relevant spec groups to laptops
        const specGroups = [
            displaySpecGroup,
            performanceSpecGroup,
            batterySpecGroup,
            connectivitySpecGroup,
            generalSpecGroup
        ];

        for (const specGroup of specGroups) {
            if (specGroup) {
                await prisma.category_SpecGroup.create({
                    data: {
                        categoryID: laptops.id,
                        specGroupID: specGroup.id
                    }
                });
            }
        }
    }

    if (tablets) {
        // Add relevant spec groups to tablets
        const specGroups = [
            displaySpecGroup,
            performanceSpecGroup,
            cameraSpecGroup,
            batterySpecGroup,
            connectivitySpecGroup,
            generalSpecGroup
        ];

        for (const specGroup of specGroups) {
            if (specGroup) {
                await prisma.category_SpecGroup.create({
                    data: {
                        categoryID: tablets.id,
                        specGroupID: specGroup.id
                    }
                });
            }
        }
    }

    console.log('Category spec groups seeded successfully!');
}
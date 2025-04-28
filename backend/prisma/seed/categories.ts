import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Kích thước icon đồng nhất cho tất cả danh mục
const STANDARD_ICON_SIZE = [24, 24];

// Mapping các icon Prime thích hợp cho từng loại danh mục
const ICON_MAPPING = {
    phone: 'pi-mobile',
    computer: 'pi-desktop',
    tablet: 'pi-tablet',
    watch: 'pi-stopwatch',
    accessory: 'pi-ellipsis-h',
    pcComponent: 'pi-server',
    game: 'pi-stop',
    music: 'pi-volume-up',
    mouse: 'pi-calculator'
};

export async function seedCategories() {
    console.log('Seeding categories...');

    // Delete existing records
    await prisma.category.deleteMany();

    // Main categories
    const smartphones = await prisma.category.create({
        data: {
            name: 'Điện thoại',
            url: 'smartphones',
            iconUrl: ICON_MAPPING.phone,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const laptops = await prisma.category.create({
        data: {
            name: 'Laptop',
            url: 'laptops',
            iconUrl: ICON_MAPPING.computer,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const tablets = await prisma.category.create({
        data: {
            name: 'Máy tính bảng',
            url: 'tablets',
            iconUrl: ICON_MAPPING.tablet,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const watches = await prisma.category.create({
        data: {
            name: 'Đồng hồ thông minh',
            url: 'smartwatches',
            iconUrl: ICON_MAPPING.watch,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const accessories = await prisma.category.create({
        data: {
            name: 'Phụ kiện',
            url: 'accessories',
            iconUrl: ICON_MAPPING.accessory,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const pcComponents = await prisma.category.create({
        data: {
            name: 'Linh kiện PC',
            url: 'pc-components',
            iconUrl: ICON_MAPPING.pcComponent,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    const gaming = await prisma.category.create({
        data: {
            name: 'Gaming',
            url: 'gaming',
            iconUrl: ICON_MAPPING.game,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    // Subcategories
    // Smartphone subcategories
    await prisma.category.create({
        data: {
            parentID: smartphones.id,
            name: 'Điện thoại Apple',
            url: 'apple-phones',
            iconUrl: ICON_MAPPING.phone,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    await prisma.category.create({
        data: {
            parentID: smartphones.id,
            name: 'Điện thoại Samsung',
            url: 'samsung-phones',
            iconUrl: ICON_MAPPING.phone,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    // Laptop subcategories
    await prisma.category.create({
        data: {
            parentID: laptops.id,
            name: 'Laptop Gaming',
            url: 'gaming-laptops',
            iconUrl: ICON_MAPPING.computer,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    await prisma.category.create({
        data: {
            parentID: laptops.id,
            name: 'Laptop Văn Phòng',
            url: 'office-laptops',
            iconUrl: ICON_MAPPING.computer,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    // Accessories subcategories
    await prisma.category.create({
        data: {
            parentID: accessories.id,
            name: 'Tai nghe',
            url: 'headphones',
            iconUrl: ICON_MAPPING.music,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    await prisma.category.create({
        data: {
            parentID: accessories.id,
            name: 'Chuột',
            url: 'mouse',
            iconUrl: ICON_MAPPING.mouse,
            iconSize: STANDARD_ICON_SIZE
        }
    });

    console.log('Categories seeded successfully!');
}
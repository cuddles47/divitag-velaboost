import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProducts() {
  console.log('Seeding products...');
  
  // Delete existing records
  await prisma.product.deleteMany();
  
  // Get categories
  const smartphoneCategory = await prisma.category.findFirst({
    where: { url: 'smartphones', parentID: null }
  });
  
  const laptopCategory = await prisma.category.findFirst({
    where: { url: 'laptops', parentID: null }
  });
  
  // Get brands
  const appleBrand = await prisma.brand.findFirst({
    where: { name: 'Apple' }
  });
  
  const samsungBrand = await prisma.brand.findFirst({
    where: { name: 'Samsung' }
  });
  
  const asusBrand = await prisma.brand.findFirst({
    where: { name: 'ASUS' }
  });
  
  // Get spec groups for product specs
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
  
  // Create iPhone product
  if (smartphoneCategory && appleBrand && displaySpecGroup && performanceSpecGroup && cameraSpecGroup && batterySpecGroup) {
    await prisma.product.create({
      data: {
        name: 'iPhone 13 Pro',
        isAvailable: true,
        desc: 'iPhone 13 Pro với màn hình Super Retina XDR 6.1 inch với ProMotion, chip A15 Bionic và hệ thống camera chuyên nghiệp.',
        specialFeatures: [
          'Màn hình Super Retina XDR với ProMotion',
          'Chip A15 Bionic',
          'Hệ thống camera Pro 3 camera',
          'Face ID',
          'Khả năng chống nước và bụi IP68'
        ],
        images: [
          '/images/products/iphone13pro1.jpg',
          '/images/products/iphone13pro2.jpg',
          '/images/products/iphone13pro3.jpg',
          '/images/products/iphone13pro4.jpg'
        ],
        categoryID: smartphoneCategory.id,
        optionSets: [],
        price: 999.0,
        salePrice: 899.0,
        specs: [
          {
            specGroupID: displaySpecGroup.id,
            specValues: [
              'Kích thước màn hình: 6.1 inch',
              'Công nghệ màn hình: Super Retina XDR OLED',
              'Độ phân giải: 1170 x 2532 pixels',
              'Tần số quét: 120Hz',
              'Độ sáng tối đa: 1200 nits'
            ]
          },
          {
            specGroupID: performanceSpecGroup.id,
            specValues: [
              'Chipset: Apple A15 Bionic',
              'CPU: Hexa-core',
              'GPU: Apple GPU (5-core)',
              'RAM: 6GB',
              'Bộ nhớ trong: 128GB'
            ]
          },
          {
            specGroupID: cameraSpecGroup.id,
            specValues: [
              'Camera chính: 12MP, f/1.5',
              'Camera phụ: 12MP ultrawide + 12MP telephoto',
              'Camera selfie: 12MP, f/2.2',
              'Quay video: 4K@60fps, HDR, Dolby Vision HDR',
              'Tính năng camera: Night mode, Deep Fusion, Smart HDR 4'
            ]
          },
          {
            specGroupID: batterySpecGroup.id,
            specValues: [
              'Dung lượng pin: 3095 mAh',
              'Công nghệ sạc: Fast charging, MagSafe, Qi wireless charging',
              'Công suất sạc tối đa: 20W',
              'Sạc không dây: Có'
            ]
          }
        ],
        brandID: appleBrand.id
      }
    });
  }
  
  // Create Samsung Galaxy product
  if (smartphoneCategory && samsungBrand && displaySpecGroup && performanceSpecGroup && cameraSpecGroup && batterySpecGroup) {
    await prisma.product.create({
      data: {
        name: 'Samsung Galaxy S22 Ultra',
        isAvailable: true,
        desc: 'Samsung Galaxy S22 Ultra với màn hình Dynamic AMOLED 2X 6.8 inch, bút S Pen tích hợp và hệ thống camera 108MP.',
        specialFeatures: [
          'Bút S Pen tích hợp',
          'Màn hình Dynamic AMOLED 2X',
          'Camera 108MP',
          'Chống nước IP68',
          'Sạc nhanh 45W'
        ],
        images: [
          '/images/products/samsungs22ultra1.jpg',
          '/images/products/samsungs22ultra2.jpg',
          '/images/products/samsungs22ultra3.jpg',
          '/images/products/samsungs22ultra4.jpg'
        ],
        categoryID: smartphoneCategory.id,
        optionSets: [],
        price: 1199.0,
        salePrice: 1099.0,
        specs: [
          {
            specGroupID: displaySpecGroup.id,
            specValues: [
              'Kích thước màn hình: 6.8 inch',
              'Công nghệ màn hình: Dynamic AMOLED 2X',
              'Độ phân giải: 1440 x 3088 pixels',
              'Tần số quét: 120Hz',
              'Độ sáng tối đa: 1750 nits'
            ]
          },
          {
            specGroupID: performanceSpecGroup.id,
            specValues: [
              'Chipset: Snapdragon 8 Gen 1',
              'CPU: Octa-core',
              'GPU: Adreno 730',
              'RAM: 12GB',
              'Bộ nhớ trong: 256GB'
            ]
          },
          {
            specGroupID: cameraSpecGroup.id,
            specValues: [
              'Camera chính: 108MP, f/1.8',
              'Camera phụ: 12MP ultrawide + 10MP periscope + 10MP telephoto',
              'Camera selfie: 40MP, f/2.2',
              'Quay video: 8K@24fps, 4K@60fps',
              'Tính năng camera: Super Steady, Night mode, Portrait mode'
            ]
          },
          {
            specGroupID: batterySpecGroup.id,
            specValues: [
              'Dung lượng pin: 5000 mAh',
              'Công nghệ sạc: Fast charging, Qi wireless charging',
              'Công suất sạc tối đa: 45W',
              'Sạc không dây: Có'
            ]
          }
        ],
        brandID: samsungBrand.id
      }
    });
  }
  
  // Create ASUS Laptop product
  if (laptopCategory && asusBrand && displaySpecGroup && performanceSpecGroup && batterySpecGroup) {
    await prisma.product.create({
      data: {
        name: 'ASUS ROG Zephyrus G14',
        isAvailable: true,
        desc: 'ASUS ROG Zephyrus G14 là laptop gaming mạnh mẽ với kích thước nhỏ gọn, màn hình 14 inch và hiệu suất cao.',
        specialFeatures: [
          'Thiết kế siêu di động cho laptop gaming',
          'Màn hình 14 inch tần số quét cao',
          'AMD Ryzen 9 và RTX 3060',
          'Thời lượng pin dài',
          'Hệ thống tản nhiệt tiên tiến'
        ],
        images: [
          '/images/products/asusrogzephyrusg141.jpg',
          '/images/products/asusrogzephyrusg142.jpg',
          '/images/products/asusrogzephyrusg143.jpg',
          '/images/products/asusrogzephyrusg144.jpg'
        ],
        categoryID: laptopCategory.id,
        optionSets: [],
        price: 1799.0,
        salePrice: 1699.0,
        specs: [
          {
            specGroupID: displaySpecGroup.id,
            specValues: [
              'Kích thước màn hình: 14 inch',
              'Công nghệ màn hình: IPS-level',
              'Độ phân giải: 2560 x 1600 pixels',
              'Tần số quét: 120Hz',
              'Độ sáng tối đa: 500 nits'
            ]
          },
          {
            specGroupID: performanceSpecGroup.id,
            specValues: [
              'Chipset: AMD',
              'CPU: AMD Ryzen 9 5900HS',
              'GPU: NVIDIA GeForce RTX 3060 6GB',
              'RAM: 16GB DDR4',
              'Bộ nhớ trong: 1TB NVMe SSD'
            ]
          },
          {
            specGroupID: batterySpecGroup.id,
            specValues: [
              'Dung lượng pin: 76Wh',
              'Công nghệ sạc: USB-C Power Delivery',
              'Công suất sạc tối đa: 100W',
              'Thời gian sử dụng: Đến 10 giờ'
            ]
          }
        ],
        brandID: asusBrand.id
      }
    });
  }
  
  console.log('Products seeded successfully!');
}
export interface TodayDeal {
    name: string;
    price: number;
    dealPrice: number;
    imgUrl: string[];
    specs: string[];
    dealDate: string;
    url: string;
}

export interface Product {
    name: string;
    price: number;
    dealPrice?: number;
    imgUrl: string[];
    specs: string[];
    url: string;
}

export const TodayDeals: TodayDeal[] = [
    {
        name: "Apple MacBook Pro",
        price: 1999,
        dealPrice: 1799,
        imgUrl: ["/images/products/macbook-pro.jpg", "/images/products/macbook-pro-2.jpg"],
        specs: ["M2 Chip", "16GB RAM", "512GB SSD"],
        dealDate: "2023-12-31",
        url: "/products/macbook-pro"
    },
    {
        name: "Dell XPS 13",
        price: 1499,
        dealPrice: 1299,
        imgUrl: ["/images/products/dell-xps.jpg", "/images/products/dell-xps-2.jpg"],
        specs: ["Intel Core i7", "16GB RAM", "1TB SSD"],
        dealDate: "2023-12-31",
        url: "/products/dell-xps-13"
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        price: 1199,
        dealPrice: 999,
        imgUrl: ["/images/products/samsung-s23.jpg", "/images/products/samsung-s23-2.jpg"],
        specs: ["Snapdragon 8 Gen 2", "12GB RAM", "256GB Storage"],
        dealDate: "2023-12-31",
        url: "/products/samsung-s23-ultra"
    }
];

export const TopProducts: Product[] = [
    {
        name: "Apple iPhone 14 Pro",
        price: 999,
        dealPrice: 899,
        imgUrl: ["/images/products/iphone-14-pro.jpg", "/images/products/iphone-14-pro-2.jpg"],
        specs: ["A16 Bionic Chip", "6.1\" Super Retina XDR", "48MP Camera"],
        url: "/products/iphone-14-pro"
    },
    {
        name: "Samsung QLED 4K TV",
        price: 1499,
        imgUrl: ["/images/products/samsung-tv.jpg", "/images/products/samsung-tv-2.jpg"],
        specs: ["65\" Display", "Quantum HDR", "Smart Hub"],
        url: "/products/samsung-qled-tv"
    },
    {
        name: "Sony WH-1000XM5",
        price: 399,
        dealPrice: 349,
        imgUrl: ["/images/products/sony-headphones.jpg", "/images/products/sony-headphones-2.jpg"],
        specs: ["Noise Cancelling", "30h Battery", "LDAC Hi-Res Audio"],
        url: "/products/sony-wh1000xm5"
    },
    {
        name: "Dyson V15 Detect",
        price: 699,
        imgUrl: ["/images/products/dyson-v15.jpg", "/images/products/dyson-v15-2.jpg"],
        specs: ["Laser Dust Detection", "HEPA Filter", "60 min Runtime"],
        url: "/products/dyson-v15"
    },
    {
        name: "LG OLED C2 TV",
        price: 1299,
        dealPrice: 1099,
        imgUrl: ["/images/products/lg-oled.jpg", "/images/products/lg-oled-2.jpg"],
        specs: ["55\" OLED Display", "4K 120Hz", "WebOS"],
        url: "/products/lg-oled-c2"
    }
];

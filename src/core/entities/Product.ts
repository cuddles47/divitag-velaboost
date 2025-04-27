export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    stock: number;
    brandId: string;
    categoryId: string;
    specialFeatures?: string[];
    images: string[];
    specs?: any[];
    createdAt: Date;
    updatedAt: Date;

    constructor(params: {
        id: string;
        name: string;
        description: string;
        price: number;
        salePrice?: number;
        stock: number;
        brandId: string;
        categoryId: string;
        specialFeatures?: string[];
        images: string[];
        specs?: any[];
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = params.id;
        this.name = params.name;
        this.description = params.description;
        this.price = params.price;
        this.salePrice = params.salePrice;
        this.stock = params.stock;
        this.brandId = params.brandId;
        this.categoryId = params.categoryId;
        this.specialFeatures = params.specialFeatures;
        this.images = params.images;
        this.specs = params.specs;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
}
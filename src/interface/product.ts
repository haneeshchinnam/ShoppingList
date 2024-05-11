export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    categoryId: string;
}

export interface IUpdateProduct {
    name?: string;
    price?: number;
    quantity?: number;
    categoryId?: string;
}

export interface IProductResponse extends IProduct {
    id: string;
}

export interface IConfig {
    id: string;
    name: string;
}
export interface ICart {
    id: string;
    name: string;
    count: number;
    price: number;
    productId: string;
}

export interface IUpdateCart {
    count: number;
    productId: string;
}
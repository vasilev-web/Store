export interface ProductsProps {
    id: number;
    title: string;
    image: string;
    descr?: string;
    price: number;
    available?: boolean;
    count?: number;
    amount?: number;
}

export interface CalculateReducerProps {
    filter?: string;
    available?: boolean;
    summa?: number;
    count?: number;
    page?: number;
    products?: ProductsProps[];
    basket?: ProductsProps[];
}

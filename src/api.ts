//api.ts
import axios from 'axios';
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
const api = axios.create({
    baseURL: 'https://fakeapi.platzi.com/'
});

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProduct = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
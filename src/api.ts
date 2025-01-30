//api.ts
import axios from 'axios';

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    creationAt: string;
    updatedAt: string;
    // Add optional properties that might not come from the API
    color?: string;
    size?: string;
    dressStyle?: string;
    rating?: {
        rate: number;
        count: number;
    };
}
const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await api.get('/products');
        return response.data.map((product: Product) => ({
            ...product,
            images: product.images
                .filter(img => img && (img.startsWith('http://') || img.startsWith('https://')))
                .map(img => img.startsWith('http://') ? img.replace('http://', 'https://') : img)
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProduct = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/categories/${categoryId}/products`);
    return response.data;
};


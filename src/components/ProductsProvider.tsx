//components/ProductsProvider
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getProducts, Product, getCategories, Category } from '../api';

interface ProductsContextType {
    products: Product[];
    categories: Category[];
    loading: boolean;
    error: string | null;

}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            // Filtrar productos que tienen imágenes válidas
            const validProducts = productsData.map(product => ({
                ...product,
                images: product.images.map(image =>
                    // Asegurarse que las imágenes usen HTTPS
                    image.startsWith('http:') ? image.replace('http:', 'https:') : image
                )
            }));
            setProducts(validProducts);
            setCategories(categoriesData);
            setError(null);
        } catch (err) {
            setError('Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const contextValue: ProductsContextType = {
        products,
        categories,
        loading,
        error,
    };

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};


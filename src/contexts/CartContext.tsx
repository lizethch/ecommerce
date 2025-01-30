//context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../api';

interface CartItem extends Product {
    quantity: number;
    size?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    getCartTotal: () => number;
    getSubtotal: () => number;
    getDiscount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product, quantity: number = 1, size: string = 'Medium') => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                item => item.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            }

            return [...prevCart, { ...product, quantity, size }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const getSubtotal = () => {
        if (cart.length === 0) return 0;
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getDiscount = () => {
        if (cart.length === 0) return 0;
        return getSubtotal() * 0.2; // 20% discount
    };

    const getCartTotal = () => {
        if (cart.length === 0) return 0;

        const subtotal = getSubtotal();
        const discount = getDiscount();
        const deliveryFee = cart.length > 0 ? 15 : 0;

        return subtotal - discount + deliveryFee;
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartTotal,
            getSubtotal,
            getDiscount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


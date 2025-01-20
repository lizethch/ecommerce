//components/ProductGrid.tsx
import { Link } from 'react-router-dom';
import { useProducts } from './ProductsProvider';
import { useCart } from '../contexts/CartContext';

const ProductGrid = () => {
    const { products, loading, error } = useProducts();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }
    const handleAddToCart = (product: any) => {
        addToCart(product, 1); //Agregamos unidad por defecto
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <Link to={`/product/${product.id}`}>
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Link>
                            <div className="p-4">
                                <h3 className="text-lg font-medium mb-2 line-clamp-2 h-14">
                                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                                </h3>
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-xl font-bold text-blue-600">
                                        ${product.price}
                                    </p>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400 mr-1">★</span>
                                        <span className="text-gray-600">{product.rating.rate}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
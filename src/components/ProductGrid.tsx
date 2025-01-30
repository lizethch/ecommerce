//components/ProductGrid.tsx
import { Link } from 'react-router-dom';
import { useProducts } from './ProductsProvider';
import { useCart } from '../contexts/CartContext';
import { Star } from 'lucide-react';

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
        addToCart(product, 1);
    };

    // Helper function to format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Helper function to generate random rating
    const generateRating = (id: number) => {
        // Use product ID as seed for consistent rating
        const baseRating = ((id * 7) % 25 + 35) / 10; // Generates ratings between 3.5 and 5.0
        return {
            rate: parseFloat(baseRating.toFixed(1)),
            count: ((id * 13) % 200) + 50 // Generates review counts between 50 and 250
        };
    };

    // Star rating component
    const StarRating = ({ rating }: { rating: number }) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        className={`${star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const rating = generateRating(product.id);
                        return (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <Link to={`/product/${product.id}`}>
                                    <div className="h-64 overflow-hidden">
                                        <img
                                            src={product.images[0] || `https://picsum.photos/seed/${product.id}/300/300`}
                                            alt={product.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = `https://picsum.photos/seed/${product.id}/300/300`;
                                            }}
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <div className="text-sm text-gray-500 mb-2">{product.category.name}</div>
                                    <h3 className="text-lg font-medium mb-2 line-clamp-2 h-14">
                                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                                    </h3>
                                    <div className="mb-2">
                                        <StarRating rating={rating.rate} />
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-xl font-bold text-blue-600">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;
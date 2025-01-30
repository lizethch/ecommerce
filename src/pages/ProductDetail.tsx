//pages/ProductDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check, Star } from 'lucide-react';
import axios from 'axios';
import { Product } from '../api';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Default');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addToCart } = useCart();

    // Define colors available - you can modify these as needed
    const colors = [
        { name: 'Default', hex: '#556B2F' },
        { name: 'Alternative', hex: '#1A4B4B' },
    ];

    // Helper function to generate consistent ratings
    const generateRating = (id: number) => {
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
                        size={20}
                        className={`${star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    ({rating} / 5) · {generateRating(Number(id)).count} reviews
                </span>
            </div>
        );
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity, selectedSize);
        }
    };

    if (loading || !product) {
        return (
            <div>
                <Header />
                <div className="container mx-auto p-8">Loading...</div>
                <Footer />
            </div>
        );
    }

    const rating = generateRating(product.id);

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
                    <Link to="/" className="hover:text-gray-700">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-gray-700">Shop</Link>
                    <span>/</span>
                    <Link to={`/category/${product.category.id}`} className="hover:text-gray-700">
                        {product.category.name}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images Section */}
                    <div className="flex gap-4">
                        {/* Vertical Thumbnails */}
                        <div className="flex flex-col gap-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`w-24 h-24 border-2 rounded-lg overflow-hidden bg-gray-100 p-2
                                        ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://placehold.co/300x300/EEE/31343C?text=Product';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product.images[selectedImageIndex]}
                                alt={product.title}
                                className="w-full h-[500px] object-contain transform transition-transform duration-300 hover:scale-110"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/300';
                                }}
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">{product.title}</h1>

                        {/* Rating Stars */}
                        <div className="mb-4">
                            <StarRating rating={rating.rate} />
                        </div>

                        {/* Category */}
                        <div className="text-gray-600">
                            Category: {product.category.name}
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        <p className="text-gray-600">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        <div>
                            <h3 className="font-medium mb-2">Select Colors</h3>
                            <div className="flex gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`relative w-8 h-8 rounded-full border-2 
                                            ${selectedColor === color.name ? 'border-blue-500' : 'border-transparent'}`}
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {selectedColor === color.name && (
                                            <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" size={16} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className="font-medium mb-2">Choose Size</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2 px-4 border rounded-md transition-colors
                                            ${selectedSize === size
                                                ? 'border-blue-500 bg-black text-white'
                                                : 'border-gray-300 hover:border-blue-500'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border rounded-l-md flex items-center justify-center hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="w-12 h-10 flex items-center justify-center border-t border-b">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border rounded-r-md flex items-center justify-center hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
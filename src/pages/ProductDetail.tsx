import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import axios from 'axios';
import { Product } from '../api';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('olive');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addToCart } = useCart();

    // Define colors available
    const colors = [
        { name: 'olive', hex: '#556B2F' },
        { name: 'teal', hex: '#1A4B4B' },
        { name: 'navy', hex: '#1B1B3A' }
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
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

    // Create image variations array
    const imageVariations = [product.image, product.image, product.image];

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
                    <Link to="/shop/men" className="hover:text-gray-700">Men</Link>
                    <span>/</span>
                    <span className="text-gray-900">T-shirts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Images Section */}
                    <div className="flex gap-4">
                        {/* Vertical Thumbnails */}
                        <div className="flex flex-col gap-4">
                            {imageVariations.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`w-24 h-24 border-2 rounded-lg overflow-hidden bg-gray-100 p-2
                                        ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} view ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={imageVariations[selectedImageIndex]}
                                alt={product.title}
                                className="w-full h-[500px] object-contain transform transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">ONE LIFE GRAPHIC T-SHIRT</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-xl ${i < Math.round(product.rating.rate)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating.rate}/5
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold">$260</span>
                            <span className="text-xl text-gray-400 line-through">$300</span>
                            <span className="text-red-500 text-sm">-40%</span>
                        </div>

                        <p className="text-gray-600">
                            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
                            breathable fabric, it offers superior comfort and style.
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

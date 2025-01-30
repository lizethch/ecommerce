import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Product } from '../api';
import axios from 'axios';
import { Star, Loader, ShoppingCart } from 'lucide-react';

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [sortBy, setSortBy] = useState('most-popular');
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Filter states
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const colorOptions = [
        { name: 'Green', class: 'bg-green-500' },
        { name: 'Red', class: 'bg-red-500' },
        { name: 'Yellow', class: 'bg-yellow-500' },
        { name: 'Orange', class: 'bg-orange-500' },
        { name: 'Blue', class: 'bg-blue-500' },
        { name: 'Purple', class: 'bg-purple-500' },
        { name: 'Pink', class: 'bg-pink-500' },
        { name: 'White', class: 'bg-white border' },
        { name: 'Black', class: 'bg-black' }
    ];

    const clothingTypes = [
        'T-shirts',
        'Shorts',
        'Shirts',
        'Hoodie',
        'Jeans'
    ];

    // Fetch products
    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/products');
                const allProducts = response.data;

                const categoryProducts = allProducts
                    .filter((product: Product) =>
                        product.category.name.toLowerCase() === category?.toLowerCase()
                    )
                    .map((product: Product) => ({
                        ...product,
                        images: product.images.map(image =>
                            image.startsWith('http:') ? image.replace('http:', 'https:') : image
                        )
                    }));

                setProducts(categoryProducts);
                setFilteredProducts(categoryProducts);
                setError(null);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchProductsByCategory();
        }
    }, [category]);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...products];

        // Apply price filter
        result = result.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply color filter if any colors are selected
        if (selectedColors.length > 0) {
            result = result.filter(product =>
                // This is a simple example - you might need to adjust based on your actual product data
                selectedColors.some(color =>
                    product.title.toLowerCase().includes(color.toLowerCase())
                )
            );
        }

        // Apply type filter if any types are selected
        if (selectedTypes.length > 0) {
            result = result.filter(product =>
                selectedTypes.some(type =>
                    product.title.toLowerCase().includes(type.toLowerCase())
                )
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low-high':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            case 'most-popular':
                // Using ID for demonstration - you might want to use actual popularity metrics
                result.sort((a, b) => generateRating(b.id).count - generateRating(a.id).count);
                break;
        }

        setFilteredProducts(result);
    }, [products, priceRange, selectedColors, selectedTypes, sortBy]);

    // Helper functions
    const generateRating = (id: number) => {
        const baseRating = ((id * 7) % 25 + 35) / 10;
        return {
            rate: parseFloat(baseRating.toFixed(1)),
            count: ((id * 13) % 200) + 50
        };
    };

    const handleTypeClick = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

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
                <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin" />
                <span className="ml-2">Loading products...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-center">
                    <p className="text-xl font-semibold mb-2">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <span>Home</span>
                    <span>/</span>
                    <span className="font-medium text-black capitalize">{category}</span>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button
                                className="text-sm text-blue-600"
                                onClick={() => {
                                    setSelectedColors([]);
                                    setSelectedTypes([]);
                                    setPriceRange([50, 200]);
                                }}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Clothing Types */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">Product Type</h3>
                            {clothingTypes.map((type) => (
                                <div key={type} className="mb-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type)}
                                            onChange={() => handleTypeClick(type)}
                                            className="rounded"
                                        />
                                        <span>{type}</span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">Price Range</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span>${priceRange[0]}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="200"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                        className="w-full"
                                    />
                                    <span>${priceRange[1]}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">Colors</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`w-6 h-6 rounded-full ${color.class} ${selectedColors.includes(color.name)
                                                ? 'ring-2 ring-offset-2 ring-black'
                                                : ''
                                            }`}
                                        onClick={() => {
                                            if (selectedColors.includes(color.name)) {
                                                setSelectedColors(selectedColors.filter(c => c !== color.name));
                                            } else {
                                                setSelectedColors([...selectedColors, color.name]);
                                            }
                                        }}
                                        aria-label={`Select ${color.name} color`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                Showing {filteredProducts.length} Products
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border rounded-md px-2 py-1"
                                >
                                    <option value="most-popular">Most Popular</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low-high">Price: Low to High</option>
                                    <option value="price-high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => {
                                const rating = generateRating(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div
                                            className="h-64 overflow-hidden cursor-pointer relative group"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {product.price > 150 && (
                                                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                                                    -30%
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium mb-2 line-clamp-2 h-14">
                                                {product.title}
                                            </h3>
                                            <StarRating rating={rating.rate} />
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl font-bold">${product.price}</span>
                                                    {product.price > 150 && (
                                                        <span className="text-sm text-red-500 line-through">
                                                            ${(product.price * 1.3).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(product);
                                                    }}
                                                    className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
                                                >
                                                    <ShoppingCart size={16} />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
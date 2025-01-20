// pages/CategoryPage.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../components/ProductsProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface FilterState {
    priceRange: [number, number];
    colors: string[];
    sizes: string[];
    dressStyle: string[];
}

const CategoryPage = () => {
    const { category, subCategory } = useParams<{ category: string; subCategory: string }>();
    const { products } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 1000],
        colors: [],
        sizes: [],
        dressStyle: [],
    });

    const categories = {
        men: {
            label: "Men's Clothing",
            subcategories: ['casual', 'formal'],
            categoryFilter: "men's clothing"
        },
        women: {
            label: "Women's Clothing",
            subcategories: ['casual', 'formal', 'jewelry'],
            categoryFilter: "women's clothing"
        },
        electronics: {
            label: 'Electronics',
            subcategories: ['gadgets', 'tech'],
            categoryFilter: "electronics"
        },
        jewelery: {
            label: 'Jewelry',
            subcategories: ['necklaces', 'rings'],
            categoryFilter: "jewelery"
        }
    };

    const colors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Gray'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const dressStyles = ['Casual', 'Formal', 'Sport', 'Party'];

    useEffect(() => {
        // Filter products based on category and subcategory
        let filtered = [...products];

        if (category && categories[category as keyof typeof categories]) {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === categories[category as keyof typeof categories].categoryFilter.toLowerCase()
            );
        }

        // Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );

        // Apply color filters if any are selected
        if (filters.colors.length > 0) {
            filtered = filtered.filter(product =>
                filters.colors.some(color =>
                    product.title.toLowerCase().includes(color.toLowerCase())
                )
            );
        }

        // Apply size filters if any are selected
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(product =>
                filters.sizes.some(size =>
                    product.description.toLowerCase().includes(size.toLowerCase())
                )
            );
        }

        // Apply dress style filters if any are selected
        if (filters.dressStyle.length > 0) {
            filtered = filtered.filter(product =>
                filters.dressStyle.some(style =>
                    product.description.toLowerCase().includes(style.toLowerCase())
                )
            );
        }

        setFilteredProducts(filtered);
    }, [category, subCategory, filters, products]);

    const toggleFilter = (type: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[type] as string[];
            return {
                ...prev,
                [type]: current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value]
            };
        });
    };

    const handlePriceChange = (min: number, max: number) => {
        setFilters(prev => ({
            ...prev,
            priceRange: [min, max]
        }));
    };

    const getCategoryLabel = () => {
        if (!category) return 'All Products';
        const categoryInfo = categories[category as keyof typeof categories];
        if (!categoryInfo) return 'Category Not Found';
        return categoryInfo.label + (subCategory ? ` - ${subCategory}` : '');
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8">
                    <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-900">{getCategoryLabel()}</span>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="sticky top-4">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <button
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                    onClick={() => setFilters({
                                        priceRange: [0, 1000],
                                        colors: [],
                                        sizes: [],
                                        dressStyle: [],
                                    })}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-4">Price Range</h3>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${filters.priceRange[0]}</span>
                                        <span>${filters.priceRange[1]}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-4">Colors</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => toggleFilter('colors', color)}
                                            className={`w-6 h-6 rounded-full border ${filters.colors.includes(color)
                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                    : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-4">Sizes</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => toggleFilter('sizes', size)}
                                            className={`px-2 py-1 border rounded ${filters.sizes.includes(size)
                                                    ? 'bg-black text-white'
                                                    : 'border-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Style Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-4">Style</h3>
                                <div className="space-y-2">
                                    {dressStyles.map(style => (
                                        <label key={style} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filters.dressStyle.includes(style)}
                                                onChange={() => toggleFilter('dressStyle', style)}
                                                className="mr-2"
                                            />
                                            {style}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">{getCategoryLabel()}</h1>
                            <p className="text-gray-600">{filteredProducts.length} products</p>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <h2 className="text-xl font-semibold mb-4">No products found</h2>
                                <p className="text-gray-600">Try adjusting your filters or browse other categories</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="h-64 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium mb-2 line-clamp-2">{product.title}</h3>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold">${product.price}</span>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 mr-1">★</span>
                                                    <span className="text-gray-600">{product.rating.rate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CategoryPage;
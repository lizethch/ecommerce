// pages/SearchResults.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../components/ProductsProvider';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    const { products } = useProducts();

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    Search Results for "{query}"
                </h1>
                <p className="mb-6 text-gray-600">
                    Found {filteredProducts.length} results
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Link to={`/product/${product.id}`}>
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={product.images[0]}
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
                                            <span className="text-gray-600">
                                                {product.rating?.rate || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-semibold mb-4">No products found</h2>
                        <p className="text-gray-600">
                            Try adjusting your search or browse our categories
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
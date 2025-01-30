//components/Header.tsx
import { useState, } from 'react';
import { CartIcon } from '../assets/icons/CartIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

// Define allowed categories
const ALLOWED_CATEGORIES = [
    'Clothes',
    'Electronics',
    'Furniture',
    'Shoes',
    'Miscellaneous'
];

const Header = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
    };

    const handleDropdownEnter = (category: string) => {
        setActiveDropdown(category);
    };

    const handleDropdownLeave = () => {
        setActiveDropdown(null);
    };

    const handleCategoryClick = (category: string) => {
        navigate(`/category/${category.toLowerCase()}`);
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <header className="bg-white shadow-sm relative z-50">
            {/* Top banner */}
            <div className="bg-black text-white text-center text-sm py-2">
                Sign up and get 20% off to your first order.
                <Link to="/signup" className="underline ml-2">Sign Up Now</Link>
            </div>

            {/* Main header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
                            SHOP.CO
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            <li
                                className="relative"
                                onMouseEnter={() => handleDropdownEnter('categories')}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <button className="flex items-center gap-1 hover:text-gray-600">
                                    Categories
                                    <ChevronDown size={16} />
                                </button>

                                {activeDropdown === 'categories' && (
                                    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                                        {ALLOWED_CATEGORIES.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleCategoryClick(category)}
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </li>
                            <li><Link to="/sale" className="hover:text-gray-600">Sale</Link></li>
                            <li><Link to="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link></li>
                        </ul>
                    </nav>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="relative hover:text-gray-600">
                            <CartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/profile" className="hover:text-gray-600">
                            <ProfileIcon />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <nav className="md:hidden border-t pt-4">
                    <ul className="space-y-4 px-4">
                        <li className="space-y-2">
                            <button
                                className="flex items-center justify-between w-full"
                                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                            >
                                Categories
                                <ChevronDown
                                    size={16}
                                    className={`transform transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {activeDropdown === 'categories' && (
                                <ul className="pl-4 space-y-2">
                                    {ALLOWED_CATEGORIES.map((category) => (
                                        <li key={category}>
                                            <button
                                                onClick={() => handleCategoryClick(category)}
                                                className="block py-2 text-gray-600 hover:text-gray-900 w-full text-left"
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li><Link to="/sale" className="block hover:text-gray-600">Sale</Link></li>
                        <li><Link to="/new-arrivals" className="block hover:text-gray-600">New Arrivals</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;

import { useState } from 'react';
import { CartIcon } from '../assets/icons/CartIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const categories = {
        category: {
            label: "Categories",
            subcategories: [
                {
                    label: "Men",
                    subItems: [
                        { label: 'Casual', path: '/category/men/casual' },
                        { label: 'Formal', path: '/category/men/formal' }
                    ]
                },
                {
                    label: "Women",
                    subItems: [
                        { label: 'Casual', path: '/category/women/casual' },
                        { label: 'Formal', path: '/category/women/formal' },
                        { label: 'Jewelry', path: '/category/women/jewelry' }
                    ]
                },
                {
                    label: "Electronics",
                    subItems: [
                        { label: 'Gadgets', path: '/category/electronics/gadgets' },
                        { label: 'Tech', path: '/category/electronics/tech' }
                    ]
                }
            ]
        }
    };

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
                            {Object.entries(categories).map(([key, category]) => (
                                <li
                                    key={key}
                                    className="relative"
                                    onMouseEnter={() => handleDropdownEnter(key)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button className="flex items-center gap-1 hover:text-gray-600">
                                        {category.label}
                                        <ChevronDown size={16} />
                                    </button>

                                    {activeDropdown === key && (
                                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                                            {category.subcategories.map((subCat) => (
                                                <div key={subCat.label} className="group relative">
                                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between">
                                                        {subCat.label}
                                                        <ChevronDown size={16} className="-rotate-90" />
                                                    </button>
                                                    <div className="absolute left-full top-0 w-48 bg-white shadow-lg rounded-md py-2 hidden group-hover:block">
                                                        {subCat.subItems.map((item) => (
                                                            <Link
                                                                key={item.path}
                                                                to={item.path}
                                                                className="block px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
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
                        {Object.entries(categories).map(([key, category]) => (
                            <li key={key} className="space-y-2">
                                <button
                                    className="flex items-center justify-between w-full"
                                    onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                                >
                                    {category.label}
                                    <ChevronDown
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {activeDropdown === key && (
                                    <ul className="pl-4 space-y-2">
                                        {category.subcategories.map((subCat) => (
                                            <li key={subCat.label} className="space-y-2">
                                                <button
                                                    className="flex items-center justify-between w-full"
                                                    onClick={() => setActiveDropdown(activeDropdown === subCat.label ? null : subCat.label)}
                                                >
                                                    {subCat.label}
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transform transition-transform ${activeDropdown === subCat.label ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                                {activeDropdown === subCat.label && (
                                                    <ul className="pl-4 space-y-2">
                                                        {subCat.subItems.map((item) => (
                                                            <li key={item.path}>
                                                                <Link
                                                                    to={item.path}
                                                                    className="block py-1 text-gray-600 hover:text-gray-900"
                                                                    onClick={toggleMobileMenu}
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li><Link to="/sale" className="block hover:text-gray-600">Sale</Link></li>
                        <li><Link to="/new-arrivals" className="block hover:text-gray-600">New Arrivals</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
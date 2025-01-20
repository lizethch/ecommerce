//components/Footer.tsx
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto grid grid-cols-4 gap-8">
                {/* Company Info Column */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Shop.co</h3>
                    <p className="text-gray-400 mb-4">
                        We believe in creating fashion that speaks to you, offering styles that are both timeless and trendy.
                    </p>
                    <div className="flex space-x-4">
                        {/* Social Media Icons - you can replace these with actual icon components */}
                        <a href="#" className="text-white hover:text-blue-500">Facebook</a>
                        <a href="#" className="text-white hover:text-blue-500">Twitter</a>
                        <a href="#" className="text-white hover:text-blue-500">Instagram</a>
                    </div>
                </div>

                {/* Company Column */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
                        <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                        <li><Link to="/works" className="text-gray-400 hover:text-white">Works</Link></li>
                        <li><Link to="/career" className="text-gray-400 hover:text-white">Career</Link></li>
                    </ul>
                </div>

                {/* Help Column */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Help</h4>
                    <ul className="space-y-2">
                        <li><Link to="/customer-support" className="text-gray-400 hover:text-white">Customer Support</Link></li>
                        <li><Link to="/delivery-details" className="text-gray-400 hover:text-white">Delivery Details</Link></li>
                        <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
                        <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* FAQ Column */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">FAQ</h4>
                    <ul className="space-y-2">
                        <li><Link to="/account" className="text-gray-400 hover:text-white">Account</Link></li>
                        <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link></li>
                        <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns</Link></li>
                        <li><Link to="/order-status" className="text-gray-400 hover:text-white">Order Status</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center">
                <p className="text-gray-400">&copy; 2024 Shop.co. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;





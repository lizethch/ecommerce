//pages/Cart.tsx
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        getSubtotal,
        getDiscount,
        getCartTotal
    } = useCart();

    // Calculate line total for each item
    const getLineTotal = (price: number, quantity: number) => {
        return price * quantity;
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link to="/" className="text-gray-500">Home</Link>
                    <span className="text-gray-500">/</span>
                    <span>Cart</span>
                </div>

                <h1 className="text-3xl font-bold mb-8">YOUR CART</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-contain"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h3 className="font-medium">{item.title}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="text-sm text-gray-500">Color: Default</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 border rounded-md flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 border rounded-md flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">${item.price} each</div>
                                            {item.quantity > 1 && (
                                                <div className="text-sm text-gray-600">
                                                    Subtotal: ${getLineTotal(item.price, item.quantity).toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${getSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-500">
                                    <span>Discount (20%)</span>
                                    <span>-${getDiscount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>${cart.length > 0 ? '15.00' : '0.00'}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>${getCartTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Add promo code"
                                        className="w-full border rounded-md px-4 py-2"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-md">
                                        Apply
                                    </button>
                                </div>
                                <button className="w-full bg-black text-white py-3 rounded-md">
                                    Go To Checkout →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
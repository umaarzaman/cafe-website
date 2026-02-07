import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { Link } from 'wouter';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const [, setLocation] = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        instructions: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                customer: formData,
                items: cart,
                total: cartTotal
            };

            const response = await axios.post('http://localhost:5000/api/orders', orderData);

            if (response.status === 201) {
                setOrderId(response.data.orderId);
                setOrderComplete(true);
                clearCart();
            }
        } catch (error) {
            console.error("Order submission failed:", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0 && !orderComplete) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-serif font-bold text-coffee-800 mb-4">Your cart is empty</h2>
                <Link href="/menu">
                    <button className="bg-terracotta text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-terracotta transition-colors">
                        Back to Menu
                    </button>
                </Link>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-coffee-100">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-coffee-800 mb-2">Order Confirmed!</h1>
                    <p className="text-coffee-600 mb-6">Thank you, {formData.name}. We've received your order.</p>

                    <div className="bg-coffee-50 rounded-lg p-4 mb-8 text-left">
                        <p className="text-sm text-coffee-500 mb-1">Order ID</p>
                        <p className="font-mono font-bold text-coffee-800">{orderId}</p>
                    </div>

                    <Link href="/">
                        <button className="w-full bg-coffee-800 text-cream py-3 rounded-xl font-bold hover:bg-coffee-900 transition-colors">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/menu">
                    <button className="flex items-center text-coffee-600 hover:text-coffee-800 mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Menu
                    </button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-2xl font-serif font-bold text-coffee-800 mb-6">Order Summary</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-coffee-100 overflow-hidden">
                            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-coffee-500 w-6">{item.quantity}x</span>
                                            <span className="text-coffee-800">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-coffee-800">Rs {(item.price * item.quantity).toFixed(0)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-coffee-50 p-6 border-t border-coffee-100">
                                <div className="flex justify-between items-center text-xl font-bold text-coffee-800">
                                    <span>Total</span>
                                    <span>Rs {cartTotal.toFixed(0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-2xl font-serif font-bold text-coffee-800 mb-6">Delivery Details</h2>
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-coffee-100 p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-coffee-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-coffee-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-coffee-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-coffee-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+92 332 2201339"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-coffee-700 mb-2">Delivery Address</label>
                                <textarea
                                    required
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-coffee-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition-all resize-none"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Street 1, Mardan..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-coffee-700 mb-2">Special Instructions (Optional)</label>
                                <textarea
                                    rows="2"
                                    className="w-full px-4 py-3 rounded-lg border border-coffee-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none transition-all resize-none"
                                    value={formData.instructions}
                                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                    placeholder="Extra napkins, gate code, etc."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-coffee-800 text-cream py-4 rounded-xl font-bold text-lg hover:bg-coffee-900 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

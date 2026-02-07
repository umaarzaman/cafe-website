import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col h-full"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-coffee-100 flex items-center justify-between bg-coffee-50">
                        <h2 className="text-xl font-serif font-bold text-coffee-800">Your Order</h2>
                        <button onClick={onClose} className="p-2 hover:bg-coffee-200 rounded-full transition-colors text-coffee-800">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-coffee-400">
                                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                                <p className="text-sm">Add some delicious items from the menu!</p>
                                <button onClick={onClose} className="mt-6 text-terracotta hover:underline">
                                    Continue Browsing
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-cream/30 rounded-lg border border-coffee-50">
                                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-coffee-800 line-clamp-1">{item.name}</h3>
                                            <span className="font-bold text-terracotta">Rs {(item.price * item.quantity).toFixed(0)}</span>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-2 bg-white rounded-lg border border-coffee-200">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-coffee-100 text-coffee-600 rounded-l-lg"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-semibold text-coffee-800">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-coffee-100 text-coffee-600 rounded-r-lg"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-coffee-100 bg-coffee-50">
                            <div className="flex justify-between items-center mb-4 text-lg font-bold text-coffee-800">
                                <span>Total</span>
                                <span>Rs {cartTotal.toFixed(0)}</span>
                            </div>
                            <Link href="/checkout">
                                <button onClick={onClose} className="w-full bg-coffee-800 text-cream py-3.5 rounded-xl font-bold hover:bg-coffee-900 transition-colors shadow-lg active:scale-[0.98]">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CartDrawer;

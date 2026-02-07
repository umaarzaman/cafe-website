import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Coffee, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onCartClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [location] = useLocation();
    const { cart } = useCart();

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md shadow-sm border-b border-coffee-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/">
                        <div className="flex items-center cursor-pointer gap-2">
                            <div className="bg-coffee-800 p-1.5 rounded-lg">
                                <Coffee className="h-6 w-6 text-cream" />
                            </div>
                            <span className="font-serif text-xl font-bold text-coffee-800 tracking-tight">
                                Mardan Café
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.path}>
                                <span className={`cursor-pointer text-sm font-medium transition-colors hover:text-terracotta ${location === link.path ? 'text-terracotta font-semibold' : 'text-coffee-700'}`}>
                                    {link.name}
                                </span>
                            </Link>
                        ))}

                        <button
                            onClick={onCartClick}
                            className="relative p-2 text-coffee-800 hover:text-terracotta transition-colors"
                        >
                            <ShoppingBag className="h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-terracotta rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <Link href="/menu">
                            <button className="bg-coffee-800 text-cream px-5 py-2 rounded-full text-sm font-medium hover:bg-coffee-900 transition-colors shadow-md hover:shadow-lg">
                                Order Now
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={onCartClick}
                            className="relative p-2 text-coffee-800"
                        >
                            <ShoppingBag className="h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-terracotta rounded-full -mt-2 -mr-2">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-coffee-800 hover:text-terracotta focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cream border-t border-coffee-200"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.path}>
                                    <div
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${location === link.path ? 'bg-coffee-100 text-terracotta' : 'text-coffee-800 hover:bg-coffee-50 hover:text-terracotta'}`}
                                    >
                                        {link.name}
                                    </div>
                                </Link>
                            ))}
                            <Link href="/menu">
                                <div onClick={() => setIsOpen(false)} className="block w-full text-center mt-4 bg-coffee-800 text-cream px-5 py-3 rounded-lg font-bold shadow-md">
                                    Order Online
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

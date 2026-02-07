import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { Loader } from 'lucide-react';

const categories = ['All', 'Coffee', 'Burgers', 'Drinks', 'Snacks'];

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // Attempt to fetch from API
                // Fallback to mock data if API fails (for demo purposes) or logic to handle it
                const response = await axios.get('http://localhost:5000/api/menu');
                setProducts(response.data);
            } catch (err) {
                console.error("Failed to fetch menu:", err);
                setError("Could not load menu. Please make sure the server is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <Loader className="w-10 h-10 text-terracotta animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream text-coffee-800">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                    <p>{error}</p>
                    <p className="text-sm mt-4 text-gray-500">Ensure backend is running on port 5000</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-coffee-800 mb-4">Our Menu</h1>
                    <p className="text-coffee-600 max-w-2xl mx-auto">Explore our carefully curated selection of beverages and bites.</p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-terracotta text-white shadow-md transform scale-105'
                                    : 'bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-12">
                        No items found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;

import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-coffee-100 flex flex-col h-full"
        >
            <div className="h-48 overflow-hidden relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold text-coffee-800">{product.name}</h3>
                    <span className="font-semibold text-terracotta">Rs {product.price.toFixed(0)}</span>
                </div>

                <p className="text-sm text-coffee-600 mb-4 flex-grow line-clamp-2">
                    {product.description}
                </p>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-coffee-100 text-coffee-800 py-2 rounded-lg font-medium hover:bg-coffee-800 hover:text-cream transition-colors flex items-center justify-center gap-2 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;

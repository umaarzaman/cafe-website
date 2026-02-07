import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Utensils, Sandwich, Croissant } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const categories = [
    { name: 'Coffee', icon: <Coffee className="w-8 h-8" />, desc: 'Premium beans', color: 'bg-coffee-100 text-coffee-800' },
    { name: 'Burgers', icon: <Utensils className="w-8 h-8" />, desc: 'Juicy & Delicious', color: 'bg-orange-100 text-terracotta' },
    { name: 'Drinks', icon: <Utensils className="w-8 h-8" />, desc: 'Fresh & Cool', color: 'bg-green-100 text-green-700' },
    { name: 'Snacks', icon: <Croissant className="w-8 h-8" />, desc: 'Sweet treats', color: 'bg-yellow-100 text-yellow-700' },
];

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80"
                        alt="Cafe Interior"
                        className="w-full h-full object-cover filter brightness-[0.4]"
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="font-serif text-5xl md:text-7xl font-bold text-cream mb-6 tracking-tight"
                    >
                        Sip, Savor, Relax
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-coffee-100 mb-8 max-w-2xl mx-auto"
                    >
                        Experience the finest artisanal coffee and gourmet bites in a cozy atmosphere designed for comfort and connection.
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="/menu">
                            <button className="bg-terracotta text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-terracotta transition-all shadow-lg transform hover:scale-105 flex items-center gap-2 mx-auto">
                                Order Online <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-coffee-800 mb-4">Our Menu</h2>
                        <p className="text-coffee-600">Freshly prepared with love and premium ingredients.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <Link href="/menu">
                                    <div className={`p-8 rounded-2xl ${cat.color} h-full transform transition-transform group-hover:-translate-y-2 shadow-sm hover:shadow-md border border-transparent hover:border-coffee-200`}>
                                        <div className="mb-4">{cat.icon}</div>
                                        <h3 className="font-serif text-xl font-bold mb-2">{cat.name}</h3>
                                        <p className="text-sm opacity-80">{cat.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-coffee-800 text-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
                                alt="Coffee Art"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="font-serif text-4xl font-bold mb-6">Brewed to Perfection</h2>
                            <p className="text-coffee-200 mb-6 text-lg leading-relaxed">
                                Our baristas are passionate about coffee. We source the finest beans from sustainable farms around the world and roast them in small batches to bring out their unique flavors right here in Mardan.
                            </p>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <h4 className="font-bold text-terracotta text-2xl mb-1">15+</h4>
                                    <p className="text-sm text-coffee-300">Coffee Varieties</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-terracotta text-2xl mb-1">100%</h4>
                                    <p className="text-sm text-coffee-300">Organic Milk</p>
                                </div>
                            </div>
                            <Link href="/about">
                                <button className="border border-cream text-cream px-6 py-3 rounded-full hover:bg-cream hover:text-coffee-800 transition-colors">
                                    Learn More about useCart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

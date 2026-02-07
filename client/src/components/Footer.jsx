import React from 'react';
import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-coffee-900 text-coffee-100 pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Coffee className="h-8 w-8 text-terracotta" />
                            <span className="font-serif text-2xl font-bold text-cream">Mardan Café</span>
                        </div>
                        <p className="text-coffee-300 max-w-sm">
                            Crafting moments of joy, one cup at a time. Experience the finest beans and coziest vibes in Mardan.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-lg font-semibold text-cream mb-4">Visit Us</h3>
                        <ul className="space-y-2 text-coffee-300">
                            <li>Street 1, Mardan</li>
                            <li>Khyber Pakhtunkhwa, Pakistan</li>
                            <li className="pt-2">Mon-Fri: 7am - 8pm</li>
                            <li>Sat-Sun: 8am - 9pm</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif text-lg font-semibold text-cream mb-4">Contact</h3>
                        <ul className="space-y-2 text-coffee-300">
                            <li>+92 332 2201339</li>
                            <li>hello@mardancafe.com</li>
                            <li className="flex gap-4 pt-4">
                                <a href="#" className="hover:text-terracotta transition-colors"><Instagram className="h-5 w-5" /></a>
                                <a href="#" className="hover:text-terracotta transition-colors"><Facebook className="h-5 w-5" /></a>
                                <a href="#" className="hover:text-terracotta transition-colors"><Twitter className="h-5 w-5" /></a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-coffee-800 pt-8 text-center text-sm text-coffee-400">
                    <p>&copy; {new Date().getFullYear()} Mardan Café. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState } from 'react';
import { Route, Switch } from 'wouter';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-sans bg-cream">
        <Navbar onCartClick={toggleCart} />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/menu" component={Menu} />
            <Route path="/checkout" component={Checkout} />
            {/* Fallback route */}
            <Route path="/:rest*" component={Home} />
          </Switch>
        </main>

        <Footer />

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;

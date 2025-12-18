import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-luxury-black text-white">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
};

export default Layout;

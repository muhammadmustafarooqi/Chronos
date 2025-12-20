import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrders } from '../data/adminData';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders must be used within an OrderProvider');
    return context;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem('chronos-orders');
            return saved ? JSON.parse(saved) : initialOrders;
        } catch (err) {
            console.error('Error loading orders from localStorage:', err);
            return initialOrders;
        }
    });

    // Save to localStorage when orders change
    useEffect(() => {
        localStorage.setItem('chronos-orders', JSON.stringify(orders));
    }, [orders]);

    // Sync with other tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'chronos-orders') {
                try {
                    setOrders(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Error syncing orders:', err);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const deleteOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
    };

    const addOrder = (order) => {
        console.log('Adding new order to context:', order);
        setOrders(prev => [order, ...prev]);
    };

    return (
        <OrderContext.Provider value={{ orders, updateOrderStatus, deleteOrder, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

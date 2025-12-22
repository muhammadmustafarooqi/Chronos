import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCustomers } from '../data/adminData';

const CustomerContext = createContext();

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (!context) throw new Error('useCustomers must be used within a CustomerProvider');
    return context;
};

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem('chronos-customers');
        return saved ? JSON.parse(saved) : initialCustomers;
    });

    useEffect(() => {
        localStorage.setItem('chronos-customers', JSON.stringify(customers));
    }, [customers]);

    // Sync with other tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'chronos-customers') {
                try {
                    const newCustomers = e.newValue ? JSON.parse(e.newValue) : initialCustomers;
                    setCustomers(newCustomers || []);
                } catch (err) {
                    console.error('Error syncing customers:', err);
                    setCustomers(initialCustomers);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateCustomerStatus = (customerId, newStatus) => {
        setCustomers(prev => prev.map(customer =>
            customer.id === customerId ? { ...customer, status: newStatus } : customer
        ));
    };

    const addCustomer = (customer) => {
        setCustomers(prev => [customer, ...prev]);
    };

    return (
        <CustomerContext.Provider value={{ customers, updateCustomerStatus, addCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};

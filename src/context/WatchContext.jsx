import React, { createContext, useContext, useState, useEffect } from 'react';
import { watches as initialWatches } from '../data/watches';

const WatchContext = createContext();

export const useWatches = () => {
    const context = useContext(WatchContext);
    if (!context) {
        throw new Error('useWatches must be used within a WatchProvider');
    }
    return context;
};

export const WatchProvider = ({ children }) => {
    const [watches, setWatches] = useState(() => {
        const saved = localStorage.getItem('chronos-watches');
        return saved ? JSON.parse(saved) : initialWatches;
    });

    useEffect(() => {
        localStorage.setItem('chronos-watches', JSON.stringify(watches));
    }, [watches]);

    const addWatch = (newWatch) => {
        const watchWithId = {
            ...newWatch,
            id: watches.length > 0 ? Math.max(...watches.map(w => w.id)) + 1 : 1
        };
        setWatches(prev => [watchWithId, ...prev]);
    };

    const updateWatch = (id, updatedWatch) => {
        setWatches(prev => prev.map(w => w.id === id ? { ...updatedWatch, id } : w));
    };

    const deleteWatch = (id) => {
        setWatches(prev => prev.filter(w => w.id !== id));
    };

    const getFeaturedWatches = () => watches.filter(w => w.isFeatured);
    const getNewArrivals = () => watches.filter(w => w.isNew);
    const getWatchesByCategory = (category) =>
        category === 'All' ? watches : watches.filter(w => w.category === category);
    const getWatchesByBrand = (brand) =>
        brand === 'All' ? watches : watches.filter(w => w.brand === brand);
    const getCategories = () => ['All', ...new Set(watches.map(w => w.category))];
    const getBrands = () => ['All', ...new Set(watches.map(w => w.brand))];

    return (
        <WatchContext.Provider value={{
            watches,
            addWatch,
            updateWatch,
            deleteWatch,
            getFeaturedWatches,
            getNewArrivals,
            getWatchesByCategory,
            getWatchesByBrand,
            getCategories,
            getBrands
        }}>
            {children}
        </WatchContext.Provider>
    );
};

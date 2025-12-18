import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { watches, getCategories, getBrands } from '../data/watches';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { X, ChevronDown, Grid, LayoutGrid, Sparkles } from 'lucide-react';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');

    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
    const [selectedBrand, setSelectedBrand] = useState(brandParam || 'All');
    const [priceRange, setPriceRange] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [gridCols, setGridCols] = useState(3);

    const categories = getCategories();
    const brands = getBrands();
    const priceRanges = [
        { label: 'All Prices', value: 'All' },
        { label: 'Under $10,000', value: 'under-10k' },
        { label: '$10K - $50K', value: '10k-50k' },
        { label: 'Over $50,000', value: 'over-50k' },
    ];
    const sortOptions = [
        { value: 'featured', label: 'Featured' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name', label: 'Name: A-Z' },
        { value: 'newest', label: 'Newest First' },
    ];

    // Update filters when URL params change
    useEffect(() => {
        if (categoryParam) setSelectedCategory(categoryParam);
        if (brandParam) setSelectedBrand(brandParam);
    }, [categoryParam, brandParam]);

    // Filter and sort logic
    const filteredProducts = useMemo(() => {
        let results = watches.filter(watch => {
            const categoryMatch = selectedCategory === 'All' || watch.category === selectedCategory;
            const brandMatch = selectedBrand === 'All' || watch.brand === selectedBrand;

            let priceMatch = true;
            if (priceRange === 'under-10k') priceMatch = watch.price < 10000;
            else if (priceRange === '10k-50k') priceMatch = watch.price >= 10000 && watch.price <= 50000;
            else if (priceRange === 'over-50k') priceMatch = watch.price > 50000;

            return categoryMatch && brandMatch && priceMatch;
        });

        // Sort
        switch (sortBy) {
            case 'price-low':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'newest':
                results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default:
                results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }

        return results;
    }, [selectedCategory, selectedBrand, priceRange, sortBy]);

    const resetFilters = () => {
        setSelectedCategory('All');
        setSelectedBrand('All');
        setPriceRange('All');
        setSortBy('featured');
    };

    const activeFilters = [
        selectedCategory !== 'All' && { type: 'category', label: selectedCategory, clear: () => setSelectedCategory('All') },
        selectedBrand !== 'All' && { type: 'brand', label: selectedBrand, clear: () => setSelectedBrand('All') },
        priceRange !== 'All' && { type: 'price', label: priceRanges.find(p => p.value === priceRange)?.label, clear: () => setPriceRange('All') },
    ].filter(Boolean);

    return (
        <div className="bg-luxury-black min-h-screen">
            {/* Hero Header */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal to-luxury-black" />
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                            Discover Excellence
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6">
                            Our Collection
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explore our curated selection of the world's finest timepieces
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section - Always Visible */}
            <section className="sticky top-[72px] z-30 bg-luxury-charcoal/95 backdrop-blur-xl border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Filter Pills Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {/* Category Pills */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                            ? 'bg-luxury-gold text-luxury-black'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Brand, Price, Sort */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Brand Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm hover:border-luxury-gold/50 transition-colors">
                                    <span className="text-gray-500">Brand:</span>
                                    <span>{selectedBrand}</span>
                                    <ChevronDown size={14} className="text-gray-500" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-48 bg-luxury-black border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-64 overflow-y-auto">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedBrand === brand
                                                    ? 'bg-luxury-gold/10 text-luxury-gold'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm hover:border-luxury-gold/50 transition-colors">
                                    <span className="text-gray-500">Price:</span>
                                    <span>{priceRanges.find(p => p.value === priceRange)?.label}</span>
                                    <ChevronDown size={14} className="text-gray-500" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-48 bg-luxury-black border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {priceRanges.map(range => (
                                        <button
                                            key={range.value}
                                            onClick={() => setPriceRange(range.value)}
                                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${priceRange === range.value
                                                    ? 'bg-luxury-gold/10 text-luxury-gold'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {range.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white text-sm hover:border-luxury-gold/50 transition-colors">
                                    <span className="text-gray-500">Sort:</span>
                                    <span>{sortOptions.find(s => s.value === sortBy)?.label}</span>
                                    <ChevronDown size={14} className="text-gray-500" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-48 bg-luxury-black border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => setSortBy(option.value)}
                                            className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === option.value
                                                    ? 'bg-luxury-gold/10 text-luxury-gold'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 text-sm">
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'timepiece' : 'timepieces'}
                            </span>

                            {/* Grid Toggle */}
                            <div className="hidden md:flex items-center border border-white/10">
                                <button
                                    onClick={() => setGridCols(2)}
                                    className={`p-2 transition-colors ${gridCols === 2 ? 'bg-luxury-gold text-luxury-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <Grid size={16} />
                                </button>
                                <button
                                    onClick={() => setGridCols(3)}
                                    className={`p-2 transition-colors ${gridCols === 3 ? 'bg-luxury-gold text-luxury-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    <LayoutGrid size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Tags */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
                            <span className="text-gray-500 text-sm">Active:</span>
                            {activeFilters.map((filter, idx) => (
                                <button
                                    key={idx}
                                    onClick={filter.clear}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-sm group hover:bg-luxury-gold/20 transition-colors"
                                >
                                    <span>{filter.label}</span>
                                    <X size={12} className="opacity-50 group-hover:opacity-100" />
                                </button>
                            ))}
                            <button
                                onClick={resetFilters}
                                className="text-sm text-gray-500 hover:text-white ml-2 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProducts.length > 0 ? (
                        <div className={`grid gap-6 ${gridCols === 2
                                ? 'grid-cols-1 md:grid-cols-2'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="text-gray-600" size={36} />
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-3">No timepieces found</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Try adjusting your filters to discover more from our collection.
                            </p>
                            <button onClick={resetFilters} className="btn-primary">
                                View All Timepieces
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Shop;

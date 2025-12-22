import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, index = 0 }) => {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [isAdded, setIsAdded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const productId = product._id || product.id;
    const isWishlisted = isInWishlist(productId);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group product-card rounded-sm"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/5]">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-luxury-charcoal animate-pulse" />
                )}

                <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-luxury-gold text-luxury-black text-[10px] font-bold uppercase tracking-wider px-3 py-1"
                        >
                            New
                        </motion.span>
                    )}
                    {product.isFeatured && (
                        <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] font-medium uppercase tracking-wider px-3 py-1">
                            Featured
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isWishlisted
                        ? 'bg-luxury-gold text-luxury-black'
                        : 'bg-black/30 text-white hover:bg-luxury-gold hover:text-luxury-black'
                        }`}
                >
                    <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdded}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${isAdded
                                ? 'bg-green-500 text-white'
                                : 'bg-luxury-gold text-luxury-black hover:bg-white'
                                }`}
                        >
                            {isAdded ? (
                                <>
                                    <Check size={14} /> Added
                                </>
                            ) : (
                                <>
                                    <ShoppingBag size={14} /> Add to Cart
                                </>
                            )}
                        </button>
                        <Link
                            to={`/product/${productId}`}
                            className="flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-luxury-black transition-all duration-300"
                        >
                            <Eye size={16} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 relative">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />

                <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-medium">
                            {product.brand}
                        </span>
                        <span className="text-gray-500 text-[10px] uppercase tracking-wider">
                            {product.category}
                        </span>
                    </div>

                    <Link to={`/product/${productId}`}>
                        <h3 className="text-lg font-serif text-white mb-3 group-hover:text-luxury-gold transition-colors duration-300 line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                        <span className="text-xl text-white font-light">
                            ${product.price.toLocaleString()}
                        </span>
                        <Link
                            to={`/product/${productId}`}
                            className="text-[10px] text-gray-500 uppercase tracking-wider hover:text-luxury-gold transition-colors hover-underline"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

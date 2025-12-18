import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { watches } from '../data/watches';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Truck, Clock, Heart, Share2, Check, ChevronRight, Star, Minus, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        const found = watches.find(w => w.id === parseInt(id));
        setProduct(found);
        setLoading(false);
        setQuantity(1);
        setIsAdded(false);
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Related products
    const relatedProducts = watches
        .filter(w => w.id !== parseInt(id) && (w.brand === product?.brand || w.category === product?.category))
        .slice(0, 4);

    if (loading) {
        return (
            <div className="min-h-screen bg-luxury-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif text-white mb-4">Product not found</h2>
                <Link to="/shop" className="btn-outline">
                    Return to Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-luxury-black min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-luxury-charcoal border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link to="/" className="text-gray-500 hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={14} className="text-gray-600" />
                        <Link to="/shop" className="text-gray-500 hover:text-white transition-colors">Collection</Link>
                        <ChevronRight size={14} className="text-gray-600" />
                        <span className="text-luxury-gold">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Product Section */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-square lg:aspect-[4/5] bg-luxury-charcoal overflow-hidden relative group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="bg-luxury-gold text-luxury-black text-xs font-bold uppercase tracking-wider px-3 py-1">
                                            New
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className={`p-3 backdrop-blur-sm transition-all ${isInWishlist(product.id)
                                            ? 'bg-luxury-gold text-luxury-black'
                                            : 'bg-black/50 text-white hover:bg-luxury-gold hover:text-luxury-black'
                                            }`}
                                    >
                                        <Heart size={18} className={isInWishlist(product.id) ? 'fill-current' : ''} />
                                    </button>
                                    <button className="p-3 bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Corner Decoration */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-luxury-gold/20 -z-10" />
                            <div className="absolute -top-4 -left-4 w-32 h-32 border border-luxury-gold/20 -z-10" />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="text-luxury-gold uppercase tracking-[0.3em] text-sm font-medium">
                                {product.brand}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif text-white mt-3 mb-6 leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className="text-luxury-gold fill-luxury-gold" />
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">(47 Reviews)</span>
                            </div>

                            <p className="text-3xl md:text-4xl text-white font-light mb-8">
                                ${product.price.toLocaleString()}
                            </p>

                            {/* Tabs */}
                            <div className="border-b border-white/10 mb-6">
                                <div className="flex gap-8">
                                    {['description', 'specifications', 'shipping'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 text-sm uppercase tracking-wider transition-colors relative ${activeTab === tab ? 'text-luxury-gold' : 'text-gray-500 hover:text-white'
                                                }`}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-luxury-gold"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-8 min-h-[120px]"
                                >
                                    {activeTab === 'description' && (
                                        <p className="text-gray-400 leading-relaxed">
                                            {product.description}
                                        </p>
                                    )}
                                    {activeTab === 'specifications' && (
                                        <ul className="grid grid-cols-2 gap-3">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-3 text-gray-400 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-luxury-gold rounded-full flex-shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {activeTab === 'shipping' && (
                                        <div className="text-gray-400 text-sm space-y-2">
                                            <p>• Complimentary insured shipping worldwide</p>
                                            <p>• White-glove delivery service available</p>
                                            <p>• 30-day returns policy</p>
                                            <p>• Estimated delivery: 3-5 business days</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Quantity & Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex items-center border border-white/10">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-4 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-6 text-white font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-4 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdded}
                                    className={`flex-1 flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-wider font-semibold transition-all ${isAdded
                                        ? 'bg-green-500 text-white'
                                        : 'btn-primary'
                                        }`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check size={18} /> Added to Cart
                                        </>
                                    ) : (
                                        'Add to Cart'
                                    )}
                                </button>
                            </div>

                            <button className="w-full btn-outline mb-10">
                                Contact Concierge
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                                {[
                                    { icon: Shield, title: '5 Year Warranty', subtitle: 'Full Coverage' },
                                    { icon: Truck, title: 'Free Shipping', subtitle: 'Insured Delivery' },
                                    { icon: Clock, title: 'Swiss Made', subtitle: 'Certified Authentic' },
                                ].map((badge, index) => (
                                    <div key={index} className="text-center">
                                        <badge.icon className="text-luxury-gold mx-auto mb-2" size={24} />
                                        <p className="text-white text-xs font-medium">{badge.title}</p>
                                        <p className="text-gray-500 text-[10px]">{badge.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-20 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-serif text-white mb-2">You May Also Like</h2>
                            <div className="h-0.5 w-16 bg-luxury-gold" />
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct, index) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;

import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import NewArrivals from '../components/NewArrivals';
import BrandShowcase from '../components/BrandShowcase';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <>
            <Hero />
            <BrandShowcase />
            <FeaturedProducts />
            <NewArrivals />

            {/* Brand Story Teaser */}
            <section className="py-28 bg-luxury-black relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-1/2 h-full">
                        <img
                            src="https://images.unsplash.com/photo-1509941943102-10c232535736?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            alt="Watchmaking"
                            className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                                Our Heritage
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                                The Art of <br />
                                <span className="text-gradient-gold">Watchmaking</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                                For over a decade, CHRONOS has been the premier destination for luxury timepieces.
                                We believe that a watch is more than just a tool to tell time—it is a statement of style,
                                a piece of history, and a work of art.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Our collection is meticulously curated to ensure authenticity and quality.
                                From the intricate movements of Patek Philippe to the robust elegance of Rolex,
                                we offer only the finest timepieces for distinguished collectors.
                            </p>
                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-3 text-luxury-gold hover:text-white transition-colors"
                            >
                                <span className="uppercase tracking-[0.2em] text-sm font-medium">
                                    Read Our Story
                                </span>
                                <ArrowRight
                                    size={18}
                                    className="transform group-hover:translate-x-2 transition-transform"
                                />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
            </section>

            <WhyChooseUs />
            <Testimonials />

            {/* CTA Section */}
            <section className="py-28 bg-gradient-to-b from-luxury-charcoal to-luxury-black relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                            Begin Your Collection
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                            Find Your Perfect Timepiece
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                            Whether you're starting your collection or adding a rare piece,
                            our experts are here to guide you every step of the way.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/shop" className="btn-primary">
                                Explore Collection
                            </Link>
                            <Link to="/contact" className="btn-outline">
                                Schedule Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Home;

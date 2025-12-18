import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Clock, ArrowRight } from 'lucide-react';

const About = () => {
    const stats = [
        { value: '2010', label: 'Founded' },
        { value: '500+', label: 'Luxury Timepieces' },
        { value: '15K+', label: 'Happy Collectors' },
        { value: '50+', label: 'Partner Brands' },
    ];

    const values = [
        {
            icon: Award,
            title: 'Authenticity Guaranteed',
            description: 'Every timepiece undergoes rigorous authentication by our certified horologists.'
        },
        {
            icon: Users,
            title: 'Expert Guidance',
            description: 'Our team of specialists provides personalized recommendations for every collector.'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Serving collectors worldwide with secure, insured shipping to every destination.'
        },
        {
            icon: Clock,
            title: 'Lifetime Service',
            description: 'Complimentary maintenance and support for the entire lifetime of your timepiece.'
        },
    ];

    return (
        <div className="bg-luxury-black min-h-screen">
            {/* Hero */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1509941943102-10c232535736?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Watchmaking"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-luxury-black/50" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            A Legacy of <br />
                            <span className="text-gradient-gold">Excellence</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed">
                            Since 2010, CHRONOS has been the trusted destination for discerning collectors
                            seeking the world's most exceptional timepieces.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-serif text-gradient-gold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-serif font-bold text-white mb-8">
                                The Art of Timekeeping
                            </h2>
                            <div className="space-y-6 text-gray-400 leading-relaxed">
                                <p>
                                    CHRONOS was founded with a singular vision: to create a sanctuary for those who understand
                                    that a timepiece is more than an instrument—it's a statement of values, a connection to
                                    history, and a work of art.
                                </p>
                                <p>
                                    Our curators travel the world, building relationships with the most prestigious
                                    manufacturers and private collectors. We meticulously verify the authenticity and
                                    provenance of every piece in our collection.
                                </p>
                                <p>
                                    Whether you're acquiring your first luxury watch or adding a rare complication to an
                                    established collection, our team of experts is dedicated to guiding you on your horological journey.
                                </p>
                            </div>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 text-luxury-gold hover:text-white transition-colors mt-8 group"
                            >
                                <span className="uppercase tracking-[0.2em] text-sm font-medium">Get in Touch</span>
                                <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80"
                                alt="Luxury Watch"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-luxury-gold/30" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-28 bg-luxury-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                            Why Choose Us
                        </span>
                        <h2 className="text-4xl font-serif font-bold text-white">
                            Our Commitment to You
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 border border-white/5 hover:border-luxury-gold/30 transition-colors"
                            >
                                <div className="w-14 h-14 border border-luxury-gold/30 flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="text-luxury-gold" size={24} />
                                </div>
                                <h3 className="text-lg font-serif text-white mb-3">{value.title}</h3>
                                <p className="text-gray-500 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-white mb-6">
                            Begin Your Collection Today
                        </h2>
                        <p className="text-gray-400 mb-10">
                            Discover the perfect timepiece that reflects your style and values.
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
        </div>
    );
};

export default About;

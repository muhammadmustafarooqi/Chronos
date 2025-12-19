import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Award, Clock, Headphones, ShieldCheck, Package } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: '100% Authentic',
        description: 'Every timepiece undergoes rigorous authentication by our certified horologists.',
    },
    {
        icon: Award,
        title: 'Certified Excellence',
        description: 'We maintain partnerships with world-renowned brands and manufacturers.',
    },
    {
        icon: Clock,
        title: 'Lifetime Service',
        description: 'Complimentary servicing and maintenance for the life of your timepiece.',
    },
    {
        icon: Headphones,
        title: 'Personal Concierge',
        description: 'Dedicated specialist available 24/7 for all your horological needs.',
    },
    {
        icon: Gem,
        title: 'Rare Pieces',
        description: 'Access to limited editions and exclusive timepieces not found elsewhere.',
    },
    {
        icon: Package,
        title: 'White Glove Delivery',
        description: 'Insured, secure shipping with real-time tracking worldwide.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-28 bg-luxury-black relative">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-luxury-gold/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] border border-luxury-gold/10 rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                        The CHRONOS Difference
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Why Choose Us
                    </h2>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto" />
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="p-8 border border-white/5 hover:border-luxury-gold/30 bg-luxury-charcoal/50 transition-all duration-500 h-full">
                                {/* Icon */}
                                <div className="w-14 h-14 border border-luxury-gold/30 flex items-center justify-center mb-6 group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold transition-all duration-500">
                                    <feature.icon className="text-luxury-gold" size={24} />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-luxury-gold transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-luxury-gold/0 border-l-[40px] border-l-transparent group-hover:border-t-luxury-gold/20 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

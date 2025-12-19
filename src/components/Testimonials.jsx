import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'James Richardson',
        role: 'Watch Collector',
        location: 'New York',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'CHRONOS delivered an exceptional experience from start to finish. The authenticity verification and white-glove delivery made purchasing my Patek Philippe absolutely seamless.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'CEO, Tech Ventures',
        location: 'San Francisco',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'I\'ve purchased three timepieces from CHRONOS. Their expertise, attention to detail, and after-sales service are unparalleled in the industry.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Michael Torres',
        role: 'Investment Banker',
        location: 'London',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        content: 'The personal concierge service at CHRONOS is extraordinary. They found me a rare Rolex Daytona that I had been searching for years.',
        rating: 5,
    },
];

const Testimonials = () => {
    return (
        <section className="py-28 bg-luxury-charcoal relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-radial-gold opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-luxury-gold text-xs uppercase tracking-[0.3em] mb-4 block">
                        Client Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Words from Our Collectors
                    </h2>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto" />
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative group"
                        >
                            <div className="glass-card p-8 h-full hover:border-luxury-gold/30 transition-all duration-500">
                                {/* Quote Icon */}
                                <Quote className="text-luxury-gold/20 absolute top-6 right-6" size={40} />

                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className="text-luxury-gold fill-luxury-gold"
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-luxury-gold/30"
                                    />
                                    <div>
                                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        <p className="text-luxury-gold text-xs">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute -inset-px bg-gradient-to-br from-luxury-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm -z-10 blur-xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

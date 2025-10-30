
import React from 'react';
import { StarIcon } from './Icons';

const testimonials = [
    {
        name: "Alex R.",
        review: "The quality is absolutely insane! The colors pop and the feel is so soft. My customers have never been happier. Will be ordering again... and again!",
        rating: 5,
        avatar: "https://picsum.photos/seed/avatar1/100/100"
    },
    {
        name: "Jessica M.",
        review: "I was hesitant at first, but DTF Transfers made it so easy. The online uploader is a breeze and my order arrived faster than I expected. Excellent quality!",
        rating: 5,
        avatar: "https://picsum.photos/seed/avatar2/100/100"
    },
    {
        name: "CoolThreads Co.",
        review: "As a small business, finding a reliable supplier is key. Their consistency and customer service are top-notch. Highly recommend for any apparel brand.",
        rating: 5,
        avatar: "https://picsum.photos/seed/avatar3/100/100"
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-brand-panel">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-textPrimary">Our Customers Love Us</h2>
                    <p className="text-lg text-textSecondary mt-2">Here's what they're saying about our transfers.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-brand-ink border border-brand-border-soft rounded-lg p-8 flex flex-col items-start">
                            <div className="flex items-center mb-4">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-brand-cyan" />
                                <div>
                                    <h4 className="text-lg font-bold text-textPrimary">{testimonial.name}</h4>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <StarIcon key={i} className="w-5 h-5 text-brand-yellow" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-textSecondary italic">"{testimonial.review}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

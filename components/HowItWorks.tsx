
import React from 'react';

const steps = [
    {
        number: 1,
        title: "Upload Your Design",
        description: "Start by uploading your artwork. Our gang sheet builder makes it easy to combine multiple designs.",
        imageUrl: "https://picsum.photos/seed/upload/500/350"
    },
    {
        number: 2,
        title: "We Print & Ship",
        description: "Our experts use top-of-the-line printers to create your transfers, shipping them out in as little as 24 hours.",
        imageUrl: "https://picsum.photos/seed/print/500/350"
    },
    {
        number: 3,
        title: "Apply & Sell",
        description: "Press your transfer onto any garment. Create stunning custom products for your brand or for yourself.",
        imageUrl: "https://picsum.photos/seed/press/500/350"
    }
]

export const HowItWorks: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-brand-ink">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-textPrimary">Start Creating Custom T-shirts at Home</h2>
                    <p className="text-lg text-textSecondary mt-2">No special equipment needed. Just your designs and a heat source. Perfect for everyone.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {steps.map(step => (
                        <div key={step.number} className="bg-brand-panel border border-brand-border-soft rounded-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
                           <div className="relative mb-4">
                                <img src={step.imageUrl} alt={step.title} className="rounded-md w-full h-auto object-cover"/>
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[linear-gradient(90deg,#0077FF,#D200FF)] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                    {step.number}
                                </div>
                           </div>
                            <h3 className="text-2xl font-bold mb-2 text-textPrimary">{step.title}</h3>
                            <p className="text-textSecondary">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

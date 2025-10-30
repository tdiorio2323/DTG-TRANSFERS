
import React from 'react';
import { CheckCircleIcon, SparklesIcon, ZapIcon, SunIcon } from './Icons';

const benefits = [
    {
        icon: <ZapIcon className="w-8 h-8 text-brand-green" />,
        title: "Easy to Apply in Seconds",
        description: "Just press with a heat press or home iron. It's that simple."
    },
    {
        icon: <SparklesIcon className="w-8 h-8 text-brand-magenta" />,
        title: "Premium Quality",
        description: "Our transfers are soft, stretchable, and incredibly durable."
    },
    {
        icon: <SunIcon className="w-8 h-8 text-brand-yellow" />,
        title: "Vibrant & Versatile",
        description: "Full CMYK color on any fabric, light or dark."
    },
    {
        icon: <CheckCircleIcon className="w-8 h-8 text-brand-cyan" />,
        title: "Unmatched Durability",
        description: "Withstands dozens of washes without cracking or fading."
    },
]

export const Benefits: React.FC = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((benefit, index) => (
                         <div 
                            key={index} 
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center flex flex-col items-center shadow-lg"
                         >
                            <div className="mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                            <p className="text-white/90">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

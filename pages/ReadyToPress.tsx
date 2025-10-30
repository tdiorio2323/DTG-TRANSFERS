import React from 'react';
import { FeaturedProducts } from '../components/FeaturedProducts';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    category: string;
}

interface ReadyToPressProps {
    allProducts: Product[];
}

export const ReadyToPress: React.FC<ReadyToPressProps> = ({ allProducts }) => {
    const readyToPressProducts = allProducts.filter(p => p.category === 'Ready to Press');
    
    return (
        <div className="bg-brand-ink">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center mb-12">
                     <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-textPrimary mb-4">Ready-to-Press Designs</h1>
                     <p className="text-lg md:text-xl text-textSecondary max-w-3xl mx-auto">
                        Browse our extensive collection of high-quality, ready-to-press DTF transfers. Perfect for any project, big or small.
                     </p>
                </div>
                {/* We can reuse the FeaturedProducts component to display the items */}
                <FeaturedProducts title="" products={allProducts} />
            </div>
        </div>
    );
};
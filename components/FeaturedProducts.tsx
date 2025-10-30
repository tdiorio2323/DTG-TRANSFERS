import React, { useState, useMemo, useEffect } from 'react';
import { StarIcon } from './Icons';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    imageUrl: string;
    category: string;
}

interface FeaturedProductsProps {
    title: string;
    products: Product[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="bg-brand-panel rounded-lg overflow-hidden group border border-brand-border-soft/50 hover:border-brand-cyan/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-textPrimary truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-brand-yellow">${product.price.toFixed(2)}</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-5 h-5 ${i < product.rating ? 'text-brand-yellow' : 'text-gray-600'}`} />
                        ))}
                    </div>
                </div>
                <button className="w-full mt-4 bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-2 px-4 rounded-md hover:scale-[1.03] active:scale-95 transition-all">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    const maxProductPrice = useMemo(() => {
        if (!products || products.length === 0) return 50;
        return Math.ceil(Math.max(...products.map(p => p.price)));
    }, [products]);

    const [priceRange, setPriceRange] = useState(maxProductPrice);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const categories = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.category)))], [products]);

    useEffect(() => {
        setPriceRange(maxProductPrice);
    }, [maxProductPrice]);

    useEffect(() => {
        let tempProducts = products;

        if (activeCategory !== 'All') {
            tempProducts = tempProducts.filter(p => p.category === activeCategory);
        }

        if (priceRange < maxProductPrice) {
            tempProducts = tempProducts.filter(p => p.price <= priceRange);
        }

        setFilteredProducts(tempProducts);
    }, [activeCategory, priceRange, products, maxProductPrice]);

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{title}</h2>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-12 p-4 max-w-2xl mx-auto">
                    <div className="w-full md:w-auto">
                        <label htmlFor="category-select" className="sr-only">Filter by category</label>
                        <select
                            id="category-select"
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            className="w-full bg-brand-panel border border-brand-border-soft rounded-md py-2 px-4 text-textPrimary appearance-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan outline-none transition-colors"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23C9C9C9' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-80">
                         <label htmlFor="price-range" className="text-textSecondary whitespace-nowrap">Max Price: <span className="font-bold text-brand-yellow">${priceRange}</span></label>
                        <input
                            id="price-range"
                            type="range"
                            min="0"
                            max={maxProductPrice}
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full h-2 bg-brand-border-soft rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                        />
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-textPrimary">No Products Found</h3>
                        <p className="text-textSecondary mt-2">Try adjusting your filters to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
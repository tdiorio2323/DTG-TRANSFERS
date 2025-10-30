
import React from 'react';

const footerLinks = {
    "Products": ["DTF Transfers", "UV Stickers", "Patches", "Blank Apparel"],
    "Company": ["About Us", "Blog", "Careers", "Contact Us"],
    "Support": ["FAQ", "Shipping Policy", "Returns", "Sitemap"],
    "Resources": ["How to Apply", "Artwork Guidelines", "Color Matching", "Inspiration"]
};

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-panel border-t border-brand-border-soft">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
                        <a href="#" className="mb-4 inline-block">
                             <img src="https://i.imgur.com/JICQbJL.png" alt="DTF Transfers Logo" className="h-16 w-auto" />
                        </a>
                        <p className="text-textSecondary text-sm">Printing at its finest.</p>
                    </div>

                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold text-textPrimary mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-textSecondary hover:text-brand-cyan transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-16 pt-8 border-t border-brand-border-soft text-center text-textSecondary text-sm">
                    <p>&copy; {new Date().getFullYear()} DTF Transfers. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

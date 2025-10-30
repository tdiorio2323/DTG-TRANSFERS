
import React from 'react';

export const CtaSection: React.FC = () => {
    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="bg-brand-panel border border-brand-border-soft rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(0,119,255,0.1)_0%,_transparent_40%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(210,0,255,0.1)_0%,_transparent_40%)]"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-textPrimary mb-4">
                            Ready to Elevate Your Apparel?
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-textSecondary mb-8">
                            Join thousands of creators and brands who trust us for their custom prints. Get started today and see the difference.
                        </p>
                        <button className="bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-4 px-10 rounded-lg shadow-lg text-lg hover:scale-[1.03] active:scale-95 transition-all">
                            Create Your First Transfer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

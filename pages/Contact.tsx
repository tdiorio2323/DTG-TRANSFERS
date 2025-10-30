import React from 'react';

export const Contact: React.FC = () => {
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-textPrimary mb-4">Get In Touch</h1>
                    <p className="text-lg md:text-xl text-textSecondary">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-brand-panel border border-brand-border-soft rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 text-textPrimary">Send Us a Message</h2>
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-textSecondary">Full Name</label>
                                <input type="text" name="name" id="name" className="mt-1 block w-full bg-brand-ink border border-brand-border-soft rounded-md p-3 text-textPrimary focus:ring-brand-cyan focus:border-brand-cyan" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-textSecondary">Email Address</label>
                                <input type="email" name="email" id="email" className="mt-1 block w-full bg-brand-ink border border-brand-border-soft rounded-md p-3 text-textPrimary focus:ring-brand-cyan focus:border-brand-cyan" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-textSecondary">Message</label>
                                <textarea id="message" name="message" rows={5} className="mt-1 block w-full bg-brand-ink border border-brand-border-soft rounded-md p-3 text-textPrimary focus:ring-brand-cyan focus:border-brand-cyan"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-[linear-gradient(90deg,#0077FF,#D200FF)] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8 text-lg">
                        <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan flex-shrink-0 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <div>
                                <h3 className="text-xl font-bold text-textPrimary">Address</h3>
                                <p className="text-textSecondary">123 Print Street, Design City, USA 12345</p>
                            </div>
                        </div>
                         <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan flex-shrink-0 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <div>
                                <h3 className="text-xl font-bold text-textPrimary">Email Us</h3>
                                <a href="mailto:support@dtftransfers.com" className="text-textSecondary hover:text-brand-cyan transition-colors">support@dtftransfers.com</a>
                            </div>
                        </div>
                         <div className="flex items-start">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-cyan flex-shrink-0 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <div>
                                <h3 className="text-xl font-bold text-textPrimary">Call Us</h3>
                                <a href="tel:+18001234567" className="text-textSecondary hover:text-brand-cyan transition-colors">+1 (800) 123-4567</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
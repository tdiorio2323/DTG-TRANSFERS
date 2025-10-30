import React, { useState } from 'react';
import { SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from './Icons';
import { Page } from '../App';

interface HeaderProps {
    navigate: (page: Page) => void;
    currentPage: Page;
}

const navItems: { name: string, page: Page }[] = [
  { name: "Home", page: "home" },
  { name: "Upload a Gang Sheet", page: "upload-gang-sheet" },
  { name: "Build a Gang Sheet", page: "build-gang-sheet" },
  { name: "Ready-to-Press", page: "ready-to-press" },
  { name: "FAQ", page: "faq" },
  { name: "Contact", page: "contact" },
];

export const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (page: Page) => {
        navigate(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} aria-label="Home page">
                           <img src="https://i.imgur.com/jVui0rH.png" alt="DTF Transfers Logo" className="h-28 w-auto" />
                        </a>
                    </div>
                    
                    <nav className="hidden lg:flex flex-grow justify-center">
                        <ul className="flex space-x-8">
                            {navItems.map(item => (
                                <li key={item.name}>
                                    <a 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); handleLinkClick(item.page); }}
                                        className={`font-bold pb-5 border-b-2 transition-all ${
                                            currentPage === item.page 
                                                ? 'text-brand-cyan border-brand-cyan' 
                                                : 'text-brand-ink border-transparent hover:text-brand-cyan hover:border-brand-cyan'
                                        }`}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden lg:flex items-center space-x-6 text-brand-ink">
                        <button className="hover:text-brand-cyan transition-colors" aria-label="Search"><SearchIcon /></button>
                        <button className="hover:text-brand-cyan transition-colors" aria-label="My Account"><UserIcon /></button>
                        <button className="hover:text-brand-cyan transition-colors" aria-label="Shopping Cart"><ShoppingCartIcon /></button>
                    </div>

                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-ink" aria-label="Open menu">
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                 <div className="lg:hidden bg-white absolute top-full left-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto shadow-lg">
                    <nav className="flex flex-col space-y-2 p-6">
                        {navItems.map(item => (
                            <a 
                                href="#" 
                                key={item.name} 
                                onClick={(e) => { e.preventDefault(); handleLinkClick(item.page); }}
                                className={`font-bold transition-colors text-lg py-2 block ${
                                    currentPage === item.page ? 'text-brand-cyan' : 'text-brand-ink hover:text-brand-cyan'
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-6 text-brand-ink pt-6 border-t border-gray-200 mt-4">
                            <button className="hover:text-brand-cyan transition-colors" aria-label="Search"><SearchIcon /></button>
                            <button className="hover:text-brand-cyan transition-colors" aria-label="My Account"><UserIcon /></button>
                            <button className="hover:text-brand-cyan transition-colors" aria-label="Shopping Cart"><ShoppingCartIcon /></button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

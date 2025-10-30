
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { BuildGangSheet } from './pages/CreateGangSheet';
import { UploadGangSheet } from './pages/UploadGangSheet';
import { ReadyToPress } from './pages/ReadyToPress';
import { Faq } from './pages/Faq';
import { Contact } from './pages/Contact';

const allProducts = [
  { id: 1, name: 'Halloween Boo Ghost', price: 9.99, rating: 5, imageUrl: 'https://picsum.photos/seed/boo/400/400', category: 'Ready to Press' },
  { id: 2, name: 'Wild & Raw Leopard', price: 12.50, rating: 4, imageUrl: 'https://picsum.photos/seed/wild/400/400', category: 'Ready to Press' },
  { id: 3, name: 'Spooky Season Ghost', price: 9.99, rating: 5, imageUrl: 'https://picsum.photos/seed/spooky/400/400', category: 'Ready to Press' },
  { id: 4, name: 'Halloween Pumpkin Face', price: 8.75, rating: 5, imageUrl: 'https://picsum.photos/seed/pumpkin/400/400', category: 'Ready to Press' },
  { id: 5, name: 'Abstract Designs Sheet', price: 24.99, rating: 5, imageUrl: 'https://picsum.photos/seed/abstract/400/500', category: 'Gang Sheets' },
  { id: 6, name: 'Vintage Western Sheet', price: 29.99, rating: 5, imageUrl: 'https://picsum.photos/seed/western/400/500', category: 'Gang Sheets' },
  { id: 7, name: 'Floral Patterns Sheet', price: 22.50, rating: 4, imageUrl: 'https://picsum.photos/seed/floral/400/500', category: 'Gang Sheets' },
  { id: 8, name: 'Retro Gaming Icons Sheet', price: 27.80, rating: 5, imageUrl: 'https://picsum.photos/seed/gaming/400/500', category: 'Gang Sheets' },
];

export type Page = 'home' | 'build-gang-sheet' | 'upload-gang-sheet' | 'ready-to-press' | 'faq' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'build-gang-sheet':
        return <BuildGangSheet />;
      case 'upload-gang-sheet':
        return <UploadGangSheet />;
      case 'ready-to-press':
        return <ReadyToPress allProducts={allProducts} />;
      case 'faq':
        return <Faq />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Benefits />
            <HowItWorks />
            <Testimonials />
            <CtaSection />
          </>
        );
    }
  };

  return (
    <div 
      className="text-textPrimary font-sans overflow-x-hidden"
      style={{ backgroundImage: "url('https://i.imgur.com/bSd1osg.jpeg')" }}
    >
      <Header navigate={navigate} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;

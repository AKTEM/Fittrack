import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrackingSection } from './components/tracking/TrackingSection';
import { GallerySection } from './components/gallery/GallerySection';
import { BlogSection } from './components/blog/BlogSection';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <TrackingSection />
        <GallerySection />
        <BlogSection />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
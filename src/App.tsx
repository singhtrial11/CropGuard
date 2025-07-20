import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import PestDetectionTool from './components/PestDetectionTool';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <PestDetectionTool />
      <About />
      <Footer />
    </div>
  );
}

export default App;
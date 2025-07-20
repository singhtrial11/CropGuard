import React, { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">CropGuard</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="#detection" className="text-gray-700 hover:text-green-600 transition-colors">Detection Tool</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Get Started
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-green-600">Features</a>
            <a href="#detection" className="block px-3 py-2 text-gray-700 hover:text-green-600">Detection Tool</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600">About</a>
            <button className="w-full text-left bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
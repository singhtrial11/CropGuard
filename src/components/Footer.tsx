import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">CropGuard</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              AI-powered pest detection technology helping farmers protect their crops and maximize yields.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-green-500 transition-colors">Features</a></li>
              <li><a href="#detection" className="text-gray-400 hover:text-green-500 transition-colors">Detection Tool</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-green-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-500" />
                <span className="text-gray-400">hello@cropguard.ai</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2025 CropGuard. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ by <span className="text-green-400 font-semibold">Shivansh Shekher Ojha</span> | Protecting crops with cutting-edge AI technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
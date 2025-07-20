import React from 'react';
import { ArrowRight, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Pest Detection</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Protect Your
                <span className="text-green-600 block">Crops with AI</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Revolutionary pest detection technology that helps farmers identify threats early, 
                reduce crop losses, and maximize yields using cutting-edge machine learning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold">
                <span>Start Detection</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-green-600 hover:text-green-600 transition-all flex items-center justify-center space-x-2 text-lg font-semibold">
                <Shield className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-600">Farmers Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Live Detection</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Shield className="w-12 h-12 mx-auto mb-2" />
                    <p>Camera Feed Preview</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Aphids Detected</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">High Risk</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Leaf Miners</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Medium Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
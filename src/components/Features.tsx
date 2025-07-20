import React from 'react';
import { Brain, Camera, BarChart3, Bell, Clock, MapPin } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms trained on thousands of pest images for accurate identification."
    },
    {
      icon: Camera,
      title: "Real-time Scanning",
      description: "Instantly scan your crops using your smartphone camera or connected IoT devices."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track pest patterns, treatment effectiveness, and crop health metrics over time."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get instant notifications when pest threats are detected in your fields."
    },
    {
      icon: Clock,
      title: "Early Detection",
      description: "Identify pest problems before they become serious threats to your harvest."
    },
    {
      icon: MapPin,
      title: "GPS Mapping",
      description: "Precise location tracking of pest hotspots across your entire farm."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Revolutionary Features for
            <span className="text-green-600"> Modern Farming</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technology designed specifically for farmers who want to stay ahead of pest threats
            and protect their investments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg group"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
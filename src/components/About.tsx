import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "Farmers Served" },
    { icon: Award, value: "95%", label: "Accuracy Rate" },
    { icon: Target, value: "200+", label: "Pest Species" },
    { icon: TrendingUp, value: "40%", label: "Yield Increase" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Revolutionizing
                <span className="text-green-600"> Agriculture</span>
                <br />with AI Technology
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                CropGuard was founded by a team of agricultural experts and AI engineers who 
                recognized the urgent need for early pest detection in modern farming.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Mission</h3>
                  <p className="text-gray-600">
                    To empower farmers worldwide with cutting-edge technology that protects crops,
                    increases yields, and promotes sustainable farming practices.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Our Vision</h3>
                  <p className="text-gray-600">
                    A world where every farmer has access to intelligent crop protection technology,
                    leading to food security and environmental sustainability.
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Join Our Mission
            </button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Crops?</h3>
              <p className="mb-6 opacity-90">
                Join thousands of farmers who are already using CropGuard to safeguard their harvests
                and maximize their yields.
              </p>
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
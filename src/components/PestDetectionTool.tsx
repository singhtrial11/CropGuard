import React, { useState } from 'react';
import { Upload, Camera, Search, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const PestDetectionTool = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockResults = [
    {
      pest: "Aphids",
      confidence: 94,
      severity: "High",
      treatment: "Apply neem oil spray within 24 hours",
      color: "red"
    },
    {
      pest: "Leaf Miners", 
      confidence: 87,
      severity: "Medium",
      treatment: "Monitor closely, consider beneficial insects",
      color: "yellow"
    },
    {
      pest: "Healthy Crop",
      confidence: 96,
      severity: "Low",
      treatment: "Continue current care routine",
      color: "green"
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <section id="detection" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Try Our
            <span className="text-green-600"> Pest Detection Tool</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload an image of your crops and let our AI instantly identify potential pest threats
            and provide treatment recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Upload className="w-5 h-5 mx-auto mb-1" />
                  Upload Image
                </button>
                <button
                  onClick={() => setActiveTab('camera')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'camera'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Camera className="w-5 h-5 mx-auto mb-1" />
                  Take Photo
                </button>
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'upload' && (
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-green-400 transition-colors">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Upload Crop Image
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Drag and drop an image of your crops, or click to browse files
                    </p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Choose File
                    </button>
                  </div>

                  {/* ML Model Integration Placeholder */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      ML Model Integration Space
                    </h4>
                    <p className="text-blue-700">
                      This is where your machine learning model will be integrated. The model will process
                      the uploaded images and return pest detection results with confidence scores.
                    </p>
                    <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                      <code className="text-sm text-blue-800">
                        // ML Model API endpoint will be called here<br/>
                        // Process image → Detect pests → Return results
                      </code>
                    </div>
                  </div>

                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="w-5 h-5 animate-spin" />
                        <span>Analyzing Image...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        <span>Analyze for Pests</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'camera' && (
                <div className="space-y-6">
                  <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Camera interface will be integrated here</p>
                      <p className="text-sm">Real-time pest detection from device camera</p>
                    </div>
                  </div>
                  
                  <button className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Capture & Analyze</span>
                  </button>
                </div>
              )}

              {/* Mock Results */}
              {!isAnalyzing && (
                <div className="mt-8 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Detection Results</h4>
                  {mockResults.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {result.color === 'red' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                          {result.color === 'yellow' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                          {result.color === 'green' && <CheckCircle className="w-5 h-5 text-green-500" />}
                          <span className="font-medium text-gray-900">{result.pest}</span>
                        </div>
                        <span className="text-sm text-gray-500">{result.confidence}% confidence</span>
                      </div>
                      <p className="text-sm text-gray-600">{result.treatment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PestDetectionTool;
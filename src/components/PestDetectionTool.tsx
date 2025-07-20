import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Search, AlertTriangle, CheckCircle, Clock, History, BarChart3, Info, Loader, X, Play, Square } from 'lucide-react';

const PestDetectionTool = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [farmerId] = useState('farmer_' + Math.random().toString(36).substr(2, 9));
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Handle file selection
  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      setSelectedImage(file);
      setDetectionResult(null);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        console.log('Image preview created');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      console.log('File dropped:', file.name);
      setSelectedImage(file);
      setDetectionResult(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      console.log('Starting camera...');
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraMode(true);
        console.log('Camera started successfully');
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available. Please check permissions.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraMode(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    console.log('Capturing photo...');
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
            setSelectedImage(file);
            setImagePreview(canvas.toDataURL());
            stopCamera();
            setActiveTab('upload'); // Switch back to upload tab to show captured image
            console.log('Photo captured successfully');
          }
        }, 'image/jpeg', 0.8);
      }
    }
  }, [stopCamera]);

  // Submit image for detection
  const handleDetection = useCallback(async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    console.log('Starting detection...');
    setIsLoading(true);
    setError(null);
    setDetectionResult(null);

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('farmer_id', farmerId);
    formData.append('location', 'CropGuard Farm');
    formData.append('crop_type', 'Mixed Crops');

    try {
      const response = await fetch(`${API_BASE_URL}/detect`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDetectionResult(data);
        console.log('Detection successful:', data);
        fetchHistory(); // Refresh history
      } else {
        setError(data.error || 'Detection failed. Please try again.');
        console.error('Detection failed:', data);
      }
    } catch (err) {
      console.error('Detection error:', err);
      setError('Unable to connect to detection service. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, farmerId]);

  // Fetch detection history
  const fetchHistory = useCallback(async () => {
    try {
      console.log('Fetching history...');
      const response = await fetch(`${API_BASE_URL}/history?farmer_id=${farmerId}&limit=10`);
      const data = await response.json();
      setHistory(data.history || []);
      console.log('History fetched:', data.history?.length || 0, 'items');
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setHistory([]);
    }
  }, [farmerId]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      console.log('Fetching stats...');
      const response = await fetch(`${API_BASE_URL}/stats?farmer_id=${farmerId}`);
      const data = await response.json();
      setStats(data);
      console.log('Stats fetched:', data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setStats(null);
    }
  }, [farmerId]);

  // Load data when tab changes
  React.useEffect(() => {
    console.log('Tab changed to:', activeTab);
    if (activeTab === 'history') {
      fetchHistory();
    } else if (activeTab === 'stats') {
      fetchStats();
    }
  }, [activeTab, fetchHistory, fetchStats]);

  // Cleanup camera on unmount
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': 
      case 'none': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const clearImage = useCallback(() => {
    console.log('Clearing image...');
    setSelectedImage(null);
    setImagePreview(null);
    setDetectionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleTabClick = useCallback((tab: string) => {
    console.log('Switching to tab:', tab);
    setActiveTab(tab);
  }, []);

  const handleUploadClick = useCallback(() => {
    console.log('Upload button clicked');
    fileInputRef.current?.click();
  }, []);

  return (
    <section id="detection" className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            AI-Powered
            <span className="text-green-600"> Pest Detection</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload an image of your crops and let our advanced AI instantly identify potential pest threats
            and provide expert treatment recommendations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => handleTabClick('upload')}
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
                  onClick={() => handleTabClick('camera')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'camera'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Camera className="w-5 h-5 mx-auto mb-1" />
                  Take Photo
                </button>
                <button
                  onClick={() => handleTabClick('history')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <History className="w-5 h-5 mx-auto mb-1" />
                  History
                </button>
                <button
                  onClick={() => handleTabClick('stats')}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                    activeTab === 'stats'
                      ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                  Analytics
                </button>
              </nav>
            </div>

            <div className="p-8">
              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div className="space-y-6">
                  {/* Upload Area */}
                  {!imagePreview ? (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
                      onClick={handleUploadClick}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Upload Crop Image
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Drag and drop an image of your crops, or click to browse files
                      </p>
                      <button 
                        type="button"
                        onClick={handleUploadClick}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Choose File
                      </button>
                    </div>
                  ) : null}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Selected Image</h3>
                      </div>
                      <img 
                        src={imagePreview} 
                        alt="Selected crop" 
                        className="max-w-full max-h-96 object-contain rounded-xl mx-auto border border-gray-200 shadow-lg"
                      />
                      <div className="flex justify-center mt-4 space-x-4">
                        <button
                          onClick={clearImage}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear</span>
                        </button>
                        <button
                          onClick={handleUploadClick}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Choose Different</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedImage && (
                    <button 
                      onClick={handleDetection}
                      disabled={isLoading}
                      className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Analyzing Image...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          <span>Detect Pests</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Camera Tab */}
              {activeTab === 'camera' && (
                <div className="space-y-6">
                  {!cameraMode ? (
                    <div className="text-center space-y-6">
                      <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Camera className="w-16 h-16 mx-auto mb-4" />
                          <p className="text-lg">Ready to capture crop images</p>
                          <p className="text-sm">Click below to start your camera</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={startCamera}
                        className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
                      >
                        <Play className="w-5 h-5" />
                        <span>Start Camera</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Camera Active</h3>
                        <p className="text-sm text-gray-600">Position your crop in the frame and capture</p>
                      </div>
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
                        />
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                          <button
                            onClick={capturePhoto}
                            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center space-x-2"
                          >
                            <Camera className="w-5 h-5" />
                            <span>Capture</span>
                          </button>
                          <button
                            onClick={stopCamera}
                            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center space-x-2"
                          >
                            <Square className="w-4 h-4" />
                            <span>Stop</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Detection History</h3>
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-gray-900">{item.pest_class}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Location: {item.location} | Crop: {item.crop_type}
                              </p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {(item.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No detection history found.</p>
                      <p className="text-sm">Start detecting pests to see your history here.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Detection Analytics</h3>
                  {stats ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                        <h4 className="font-semibold text-blue-600 mb-2">Total Detections</h4>
                        <p className="text-3xl font-bold text-blue-800">{stats.total_detections}</p>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
                        <h4 className="font-semibold text-green-600 mb-2">Avg Confidence</h4>
                        <p className="text-3xl font-bold text-green-800">{stats.average_confidence}%</p>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                        <h4 className="font-semibold text-yellow-600 mb-2">Most Common</h4>
                        <p className="text-lg font-bold text-yellow-800">{stats.most_common_pest}</p>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl">
                        <h4 className="font-semibold text-purple-600 mb-2">Pest Types</h4>
                        <p className="text-3xl font-bold text-purple-800">
                          {Object.keys(stats.pest_distribution || {}).length}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Loading analytics...</p>
                    </div>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <div className="flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Detection Results */}
              {detectionResult && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                    <Info size={24} className="mr-2 text-blue-600" />
                    Detection Results
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Main Results */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-600">Detected Pest:</span>
                          <span className="text-xl font-bold text-gray-900">
                            {detectionResult.pest_detected}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-600">Scientific Name:</span>
                          <span className="italic text-gray-700">{detectionResult.scientific_name}</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-600">Confidence:</span>
                          <span className={`font-bold text-lg ${getConfidenceColor(detectionResult.confidence)}`}>
                            {detectionResult.confidence}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Threat Level:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(detectionResult.severity)}`}>
                            {detectionResult.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Treatment & Prevention */}
                    <div className="space-y-4">
                      <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                        <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Recommended Treatment:
                        </h4>
                        <p className="text-sm text-red-600">{detectionResult.treatment}</p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                        <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Prevention Tips:
                        </h4>
                        <p className="text-sm text-blue-600">{detectionResult.prevention}</p>
                      </div>
                    </div>
                  </div>

                  {/* All Predictions */}
                  {detectionResult.all_predictions && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Detailed Analysis:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {detectionResult.all_predictions.map((pred: any, index: number) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700 truncate">{pred.class}</span>
                              <span className="text-sm font-bold text-gray-900">{pred.confidence}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${pred.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
# CropGuard - AI-Powered Pest Detection Platform

A modern startup platform that helps farmers detect crop pests using advanced machine learning technology.

## 🌟 Features

### Frontend (React + TypeScript)
- **Modern Landing Page**: Professional startup-style design with compelling hero section
- **AI Pest Detection Tool**: Real-time image analysis with camera capture support
- **Treatment Recommendations**: Expert advice for identified pests
- **Detection History**: Track past detections and patterns
- **Analytics Dashboard**: Comprehensive statistics and insights
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Backend Integration Ready
- **ML Model Integration**: Seamless connection to TensorFlow-based pest detection API
- **Real-time Processing**: Instant image analysis and results
- **Database Storage**: SQLite-based detection history and analytics
- **RESTful API**: Clean endpoints for all detection operations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.9+ (for backend)
- Modern web browser with camera support

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup (Optional - for full ML functionality)
```bash
# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install flask flask-cors tensorflow opencv-python pillow numpy sqlite3 werkzeug scikit-learn matplotlib seaborn

# Run the ML backend
python backend/app.py
```

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend (ML Integration)
- **Flask** REST API
- **TensorFlow** for deep learning
- **OpenCV** for image processing
- **SQLite** for data storage
- **EfficientNetB0** transfer learning model

## 📱 Supported Features

### Pest Detection
- Upload images from device
- Real-time camera capture
- AI-powered pest identification
- Confidence scoring
- Treatment recommendations

### Supported Pest Classes
1. **Aphids** - Small sap-sucking insects
2. **Armyworm** - Destructive caterpillars  
3. **Bollworm** - Cotton and grain pest
4. **Leaf Beetle** - Leaf-eating beetles
5. **Grasshopper** - Jumping plant eaters
6. **Healthy** - No pest detected

### Analytics & History
- Detection history tracking
- Confidence analytics
- Pest distribution charts
- Treatment effectiveness metrics

## 🌐 API Endpoints

When backend is running on `http://localhost:5000`:

- `POST /api/detect` - Upload image for pest detection
- `GET /api/health` - API health check
- `GET /api/history` - Get detection history
- `GET /api/stats` - Get detection statistics
- `GET /api/pest-info/<pest_name>` - Get detailed pest information

## 📊 Project Structure

```
cropguard/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── PestDetectionTool.tsx  # Main ML integration
│   │   ├── About.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   └── main.tsx
├── backend/                       # ML Backend (optional)
│   ├── app.py                    # Flask API server
│   ├── train_model.py           # Model training script
│   └── requirements.txt         # Python dependencies
└── public/
```

## 🎨 Design Features

- **Apple-level aesthetics** with attention to detail
- **Smooth animations** and micro-interactions
- **Professional color palette** (Green primary, Orange accents)
- **Responsive breakpoints** for all device sizes
- **Accessible design** with proper contrast ratios

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] GPS-based pest mapping
- [ ] Weather integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Push notifications
- [ ] Integration with agricultural databases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting section in the code comments
- Review API documentation
- Test with sample images
- Check browser console for errors

---

**Happy Farming! 🌾🚜**

Built with ❤️ for farmers worldwide.
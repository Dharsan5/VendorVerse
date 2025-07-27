# 🛒 Smart Vendor Marketplace

A modern, multilingual e-commerce platform designed for Indian vendors with advanced accessibility features, voice ordering, and innovative group buying capabilities.

## 🌟 Features

### 🎯 Core Shopping Experience
- **Multi-language Support**: English, Hindi (हिंदी), and Tamil (தமிழ்) interface
- **Visual Shopping**: Large emoji-based product display for better accessibility
- **Voice Ordering**: Speech-to-text ordering in local languages
- **Smart Cart**: Real-time cart management with delivery calculations
- **Secure Payment**: Multiple payment methods (Card, UPI, Cash on Delivery)

### 🚀 Innovative Features

#### 🗣️ Voice-Based Ordering
- Voice commands in English, Hindi, and Tamil
- Natural language processing for product recognition
- Hands-free shopping experience
- Perfect for users with literacy challenges

#### 📱 Daily Price Alerts
- WhatsApp and SMS notifications
- Customizable price thresholds
- Daily/weekly market updates
- Track favorite products automatically

#### 👥 Local Vendor Pooling (Group Buying)
- Join buying groups for bulk discounts
- Real-time pool progress tracking
- Location-based vendor matching
- Collective bargaining power

#### 🎨 Visual Product Grid
- Accessibility-first design
- Large emojis and clear visual indicators
- Audio playback of product names
- Color-coded categories
- Image-free fast loading

#### 📦 Bulk Ordering System
- Individual bulk orders with wholesale pricing
- Minimum quantity discounts
- Savings calculator
- Scheduled deliveries

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives

### UI Components
- **Lucide React** - Beautiful icons
- **Tailwind Animations** - Smooth transitions
- **Class Variance Authority** - Component variants
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser with speech synthesis support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 App Structure

### Main Components

#### 🏠 Core Pages
- **ProductGrid** - Traditional product listing with emojis
- **VisualProductGrid** - Accessibility-focused visual shopping
- **VoiceOrdering** - Voice command interface
- **BulkOrdering** - Individual and group bulk purchasing
- **PriceAlerts** - Notification management

#### 🛒 Shopping Flow
- **Cart** - Shopping cart with smart calculations
- **Payment** - Multi-method payment processing
- **PaymentSuccess** - Order confirmation and tracking

#### 🎨 UI Components
- **Header** - Navigation and language switcher
- **Button, Card, Input** - Reusable UI primitives
- **Badge, Tabs, Progress** - Interactive components

### File Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── Cart.tsx           # Shopping cart
│   ├── Payment.tsx        # Payment processing
│   ├── ProductGrid.tsx    # Main product display
│   ├── VisualProductGrid.tsx  # Accessible visual grid
│   ├── VoiceOrdering.tsx  # Voice interface
│   ├── BulkOrdering.tsx   # Bulk purchase system
│   └── PriceAlerts.tsx    # Notification system
├── lib/
│   └── utils.ts           # Utility functions
└── App.tsx                # Main application
```

## 🎯 Usage Guide

### 🛍️ Shopping
1. **Browse Products**: Use the "Products" or "Visual" tabs
2. **Voice Shopping**: Click "Voice" tab and speak your order
3. **Add to Cart**: Click product cards or use voice commands
4. **Checkout**: Review cart and proceed to payment

### 🔊 Voice Commands
- "I need 2 kg onions" (English)
- "मुझे 2 किलो प्याज चाहिए" (Hindi)
- "எனக்கு 2 கிலோ வெங்காயம் வேண்டும்" (Tamil)

### 📦 Bulk Ordering
1. Go to "Bulk" tab
2. Choose "Individual Bulk Orders" or "Group Pooling"
3. Meet minimum quantities for discounts
4. Track savings in real-time

### 🔔 Price Alerts
1. Visit "Alerts" tab
2. Set phone number for notifications
3. Add products to watch list
4. Receive daily price updates

## 🌐 Multi-language Support

### Supported Languages
- **English** - Default interface
- **Hindi (हिंदी)** - Complete translation
- **Tamil (தமிழ்)** - Complete translation

### Language Features
- **UI Translation** - All buttons, labels, and messages
- **Product Names** - Localized product information
- **Voice Recognition** - Speech-to-text in all languages
- **Text-to-Speech** - Product name pronunciation

## 🎨 Design Philosophy

### Accessibility First
- **Large visual elements** for better visibility
- **Voice interface** for hands-free operation
- **Simple navigation** with clear visual hierarchy
- **Color-coded categories** for quick recognition
- **Emoji-based design** for universal understanding

### Mobile-Responsive
- **Touch-friendly buttons** with proper sizing
- **Responsive grid layouts** for all screen sizes
- **Optimized performance** for slower devices
- **Offline-capable** design patterns

## 🔧 Configuration

### Environment Variables
Create a `.env` file for production settings:
```env
VITE_API_URL=your-api-endpoint
VITE_PAYMENT_KEY=your-payment-key
VITE_SMS_API=your-sms-service
```

### Customization
- **Colors**: Modify `tailwind.config.js`
- **Components**: Edit files in `src/components/ui/`
- **Languages**: Add translations in component files
- **Products**: Update product arrays in component files

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Self-hosted
```bash
npm run build
# Serve dist/ folder with any static server
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind for styling
- Maintain accessibility standards
- Add proper error handling
- Write descriptive commit messages

## 📋 Roadmap

### 🎯 Upcoming Features
- [ ] **Waste Exchange System** - Food waste trading
- [ ] **Trust Score System** - Vendor reliability ratings
- [ ] **Offline Mode** - PWA with local storage
- [ ] **GPS Integration** - Location-based vendor discovery
- [ ] **AI Price Prediction** - Smart pricing algorithms
- [ ] **Video Calls** - Virtual vendor consultations

### 🔄 Improvements
- [ ] Real-time inventory updates
- [ ] Enhanced voice recognition
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Social sharing features

## 🐛 Known Issues

- Voice recognition may require microphone permissions
- Speech synthesis varies by browser and OS
- Some emojis may not display on older devices
- Local storage has size limitations

## 📞 Support

For support and questions:
- **Email**: support@smartvendor.com
- **Documentation**: [docs.smartvendor.com]
- **Issues**: Create GitHub issue
- **Discussions**: GitHub Discussions tab

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **Vite** - Next generation frontend tooling
- **React Team** - Amazing UI library

---

**Built with ❤️ for Indian vendors and customers**

*Empowering local commerce through technology and accessibility*

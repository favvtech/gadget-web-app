# HOHAN - Premium Gadgets & Electronics E-Commerce Web App

A modern, fully functional e-commerce web application built with React + Vite, featuring Firebase Authentication, real-time product images from Unsplash, and a complete shopping experience.

## Features

- 🛍️ **Full Shopping Experience**: Browse products, add to cart, wishlist, and checkout
- 🔐 **Firebase Authentication**: Secure sign up and login functionality
- 🖼️ **Real Product Images**: Fetches actual product images from Unsplash API
- 📱 **Fully Responsive**: Optimized for both desktop (768px+) and mobile (≤767px)
- 🎨 **Modern UI Design**: Beautiful interface with smooth animations and transitions
- 🛒 **Cart & Wishlist**: Persistent storage using LocalStorage
- 🔍 **Search Functionality**: Search products across all categories
- 📦 **Product Categories**: 8+ categories including Smartphones, Computers, Audio, Gaming, and more

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Styling**: CSS3 with CSS Variables
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Images**: Unsplash API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── home/           # Homepage-specific components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Footer component
│   └── Layout.jsx      # Main layout wrapper
├── pages/              # Page components
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Category.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   ├── Login.jsx
│   └── SignUp.jsx
├── store/              # Zustand state management
│   ├── authStore.js
│   ├── cartStore.js
│   ├── wishlistStore.js
│   └── uiStore.js
├── config/             # Configuration files
│   ├── firebase.js
│   ├── images.js
│   └── constants.js
├── data/               # Product data
│   └── products.js
└── styles/             # CSS files
    ├── index.css
    ├── components/
    └── pages/
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Unsplash account (for API access)

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

4. **Configure Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Enable Authentication → Email/Password
   - Get your Firebase config from Project Settings → Your apps → Web app
   - Add the config values to your `.env` file

5. **Get Unsplash API Key**

   - Go to [Unsplash Developers](https://unsplash.com/developers)
   - Create a new application
   - Copy your Access Key
   - Add it to your `.env` file

6. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Color Palette

- **Primary**: `#2A0800` (Dark Brown)
- **Secondary**: `#775144` (Medium Brown)
- **Accent**: `#FADBD8` (Light Pink)
- **Neutral 1**: `#C09891` (Light Brown)
- **Neutral 2**: `#BEA8A7` (Light Brown)

## Responsive Breakpoints

- **Mobile**: ≤767px
- **Desktop**: ≥768px

## Features Breakdown

### Homepage
- Hero banner with carousel
- Promotional banners
- Product categories carousel
- Service guarantees
- Featured products showcase
- Top smartphone trends

### Product Pages
- Product detail page with image gallery
- Product specifications
- Add to cart/wishlist
- Quantity selector
- Related products

### Shopping Features
- Shopping cart with LocalStorage persistence
- Wishlist functionality
- Search across all products
- Category filtering

### Authentication
- Sign up with email/password
- Login with Firebase Auth
- Protected routes
- User session management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For support, email support@hohan.com or call 0123-456-789

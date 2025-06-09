# Skip Size Selector - React Application

A modern, responsive React application for selecting skip sizes, built as part of a coding challenge. This application provides a clean and intuitive interface for users to browse and select from various skip sizes for waste management.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Optimized for both mobile and desktop viewing
- **Progress Indicator**: Visual step indicator showing user progress
- **Real-time API Integration**: Fetches skip data from API with fallback to mock data
- **Interactive Cards**: Hoverable skip cards with selection states
- **Loading States**: Smooth loading animations and error handling
- **Accessibility**: ARIA-compliant components for better accessibility

## 🛠️ Technology Stack

- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and progress steps
│   ├── SkipCard.tsx    # Individual skip card component
│   └── SkipSelector.tsx # Main skip selection component
├── hooks/              # Custom React hooks
│   └── useSkips.ts     # Hook for skip data management
├── services/           # API and data services
│   └── skipService.ts  # Skip data fetching service
├── types/              # TypeScript type definitions
│   └── skip.ts         # Skip-related interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Design Approach

### UI/UX Improvements Made:

1. **Clean Visual Hierarchy**: Clear typography with Inter font family
2. **Modern Card Design**: Rounded corners, shadows, and hover effects
3. **Color System**: Consistent blue primary color palette
4. **Responsive Grid**: Adaptive layout for different screen sizes
5. **Visual Feedback**: Selection states, loading spinners, and hover effects
6. **Progress Indicator**: Step-by-step navigation showing current progress
7. **Error Handling**: User-friendly error messages with retry options

### Key Design Decisions:

- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Optimized images and lazy loading considerations
- **User Experience**: Clear call-to-actions and intuitive navigation

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd skip-size-selector
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 API Integration

The application fetches skip data from:

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

**Fallback Strategy**: If the API is unavailable, the application displays mock data to ensure functionality.

## 📱 Responsive Design

- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: Two column grid
- **Desktop (1024px - 1280px)**: Three column grid
- **Large Desktop (> 1280px)**: Four column grid

## 🧩 Component Architecture

### SkipCard Component

- Displays individual skip information
- Shows price, capacity, and hire period
- Handles selection state and interactions
- Responsive hover effects

### SkipSelector Component

- Main container for skip selection
- Manages selected skip state
- Handles loading and error states
- Displays selection summary

### Header Component

- Progress step indicator
- Application title and description
- Responsive navigation

## 🎯 Key Features Implemented

1. **Data Fetching**: Axios-based service with error handling
2. **State Management**: React hooks for component state
3. **Type Safety**: Comprehensive TypeScript interfaces
4. **Responsive UI**: Mobile-first Tailwind CSS design
5. **User Feedback**: Loading states, error messages, selection feedback
6. **Modern Design**: Clean, professional appearance with smooth animations

## 🚦 Development Guidelines

### Code Quality

- ESLint configuration for code consistency
- TypeScript strict mode enabled
- Component-based architecture
- Separation of concerns (services, types, components)

### Best Practices

- Custom hooks for business logic
- Type-safe API interactions
- Responsive design patterns
- Accessible component design

## 🔮 Future Enhancements

- Unit tests with Jest/React Testing Library
- Integration with real payment systems
- Advanced filtering and sorting options
- Skip size recommendation engine
- User preferences and saved selections
- Internationalization (i18n) support

## 📄 License

This project is part of a coding challenge for front-end development evaluation.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

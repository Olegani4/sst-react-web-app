# Solar System Trip (SST) 🚀

**Explore the Solar System like never before**

A single-page React web application that simulates space tourism across our solar system. Experience what interplanetary travel might look like in the future through an interactive, visually stunning interface.

![SST Preview](public/logo-sst.svg)

## ✨ Features

### 🌍 Planet Exploration
- **Interactive Planet Selection**: Choose from all 8 planets in our solar system
- **Detailed Planet Information**: Learn about each planet with rich descriptions
- **Distance & Travel Time**: Realistic travel calculations for each destination
- **Visual Planet Representations**: Beautiful stylized icons for each celestial body

### 🚀 Flight Booking System
- **Flight Schedule**: Browse available flights with launch dates and departure stations
- **Real-time Availability**: Check seat availability and pricing
- **Interactive Booking**: Select flights, adjust seat count, and calculate totals
- **Multiple Launch Sites**: Various departure stations

### 🎮 Interactive Elements
- **Planet Knowledge Quiz**: Test your solar system knowledge
- **Image Gallery**: Explore space-themed visuals and astronaut experiences
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Engaging user experience with UI/UX

### 🎨 Visual Design
- **Space Theme**: Dark blue to purple gradient backgrounds
- **UI**: Clean, futuristic interface design

## 🛠️ Tech Stack ds

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: SCSS/SASS
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Olegani4/sst-react-web-app.git
   cd sst-react-web-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run compile:sass` - Compile SCSS to CSS

## 📁 Project Structure

```
sst-react-web-app/
├── public/                 # Static assets
│   └── logo-sst.svg        # SST logo
├── src/                    # Source code
│   ├── assets/             # Images and other assets
│   │   ├── icons/          # SVG icons
│   │   │   ├── contacts/   # Contact icons (email, figma, github)
│   │   │   ├── logo/       # Logo variations
│   │   │   ├── planets/    # Planet icons for all 8 planets
│   │   │   └── ui/         # UI icons (eye, etc.)
│   │   └── images/         # Image assets
│   │       └── gallery/    # Gallery images
│   ├── components/         # React components
│   │   ├── layout/         # Layout components
│   │   │   ├── Footer/     # Footer component
│   │   │   └── Header/     # Header component
│   │   ├── sections/       # Page sections
│   │   │   ├── About/      # About section
│   │   │   ├── FlightsSchedule/  # Flight booking
│   │   │   ├── Gallery/    # Image gallery
│   │   │   ├── MiniGame/   # Interactive quiz
│   │   │   ├── PlanetOverview/  # Planet information
│   │   │   ├── PlanetsRoutes/   # Planet selection
│   │   │   └── ServiceOverview/ # Service information
│   │   └── ui/             # Reusable UI components
│   │       └── Planet/     # Planet component
│   ├── styles/             # SCSS styles
│   │   ├── _base.scss      # Base styles
│   │   ├── _fonts.scss     # Font definitions
│   │   ├── _typography.scss # Typography styles
│   │   └── _variables.scss # SCSS variables
│   ├── utils/              # Utility functions
│   │   ├── api.js          # API utilities
│   │   └── mockdata/       # Mock data
│   │       ├── flights-data.js    # Flight information
│   │       ├── gallery.js         # Gallery data
│   │       ├── mini-game-questions.js  # Quiz questions
│   │       └── planets-data.js    # Planet information
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   ├── main.scss           # Main SCSS file
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── package-lock.json       # Lock file
├── index.html              # HTML entry point
└── README.md               # This file
```

## 🎯 Key Components to Implement

### Core Features
- [x] Planet selection interface with interactive icons
- [x] Planet detail cards with information display
- [x] Flight schedule table with sorting and filtering
- [x] Booking system with seat selection and pricing
- [x] Image gallery with space-themed photos
- [ ] Planet knowledge quiz
- [ ] Responsive design for mobile and desktop

### Technical Implementation
- [x] React components for each major section
- [X] State management for booking selections
- [X] SCSS styling with space theme
- [ ] Interactive animations and transitions
- [ ] Form validation for booking system

## 🚀 Deployment

Under construction...

## 🤝 Contributing

This is a personal project for learning and practice, but suggestions and feedback are welcome!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🧐 Author

- **GitHub**: [Olegani4](https://github.com/Olegani4)

---

**Disclaimer**: All flights are fictional (for now) 😉

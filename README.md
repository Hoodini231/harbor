# ⚓ Harbour

High-performance trading suite combining prediction markets, traditional assets, and crypto.

## 🚀 Quick Start

### Preflight Setup (Recommended)

Run the automated setup script to install all dependencies and prepare the project:

```bash
./preflight
```

This will:
- ✅ Check Node.js and npm installations
- ✅ Clean old dependencies
- ✅ Install all packages with correct peer dependencies
- ✅ Clear Metro bundler cache
- ✅ Verify project structure

### Manual Setup

If you prefer manual setup:

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

## 📚 Documentation

**[📋 Documentation Index](./DOCS_INDEX.md)** - Navigate all docs

### Quick Links
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Complete FSD guide, styling patterns, development workflow
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Quick reference for common tasks
- **[QUICKREF.md](./QUICKREF.md)** - One-page cheat sheet (keep open while coding)
- **[CLAUDE.md](./CLAUDE.md)** - System prompt for AI coding assistants

## 🏗️ Project Structure

Built with **Feature-Sliced Design (FSD)** architecture:

```
harbour/
├── app/                    # Expo Router (file-based routing)
│   ├── (tabs)/            # Tab navigation routes
│   ├── splash.tsx         # Splash screen
│   ├── login.tsx          # Login page
│   └── _layout.tsx        # Root layout
│
├── src/                   # FSD layers
│   ├── application/       # App initialization & providers
│   ├── pages/             # Full page compositions
│   │   ├── home/         # Discovery page
│   │   ├── login/        # Authentication
│   │   └── splash/       # Splash screen
│   ├── widgets/          # Complex UI blocks
│   │   └── navigation/   # Bottom nav bar
│   ├── features/         # Business features
│   │   └── auth/         # Authentication logic
│   ├── entities/         # Business entities
│   ├── shared/           # Shared resources
│   │   ├── ui/          # UI components
│   │   ├── config/      # Theme & constants
│   │   └── lib/         # Utilities & hooks
│   └── widgets/         # Composite UI blocks
```

### FSD Quick Reference

**Layer Import Rules** (strict hierarchy):
```
application → pages → widgets → features → entities → shared
```

Each layer can ONLY import from layers below it. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📱 Available Routes

- `/splash` - Splash screen with auto-redirect
- `/login` - Authentication page
- `/(tabs)` - Home (Discovery page)
- `/(tabs)/portfolio` - Portfolio view
- `/(tabs)/news` - News feed
- `/(tabs)/watchlist` - Asset watchlist
- `/(tabs)/markets` - Markets overview

## 🎯 Development

### Start Development Server

```bash
npm start
```

### Run on Specific Platform

```bash
npm run ios        # iOS Simulator
npm run android    # Android Emulator
npm run web        # Web Browser
```

### Clear Caches

```bash
npm start -- --clear
```

## 🛠️ Tech Stack

- **Framework**: React Native + Expo SDK 53
- **Router**: Expo Router (file-based)
- **Language**: TypeScript
- **Styling**: StyleSheet (React Native)
- **State**: React Hooks
- **Architecture**: Feature-Sliced Design (FSD)

## 🎨 Design System

**Harbour Midnight** - Dark-themed trading interface

- **Primary**: Harbour Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Background**: Midnight gradient (#0A1929 → #0F2B3F)

**Styling Approach**:
- React Native StyleSheet (NOT Tailwind CSS)
- Utility-first theme system (`HarbourColors`, `Spacing`, `BorderRadius`)
- Glassmorphism effects
- Custom design tokens

See [CONTRIBUTING.md](./CONTRIBUTING.md#styling-guide) for complete styling guide.

## 📦 Key Features

- ✅ Authentication (email/password + OAuth)
- ✅ Bottom navigation (5 tabs)
- ✅ Discovery page with search
- ✅ Prediction markets placeholders
- ✅ Traditional assets placeholders
- ✅ Dark theme with gradients

## 🔧 Troubleshooting

### Clear Everything

```bash
./preflight
```

### Metro Bundler Issues

```bash
npx expo start --clear
watchman watch-del-all  # If watchman installed
```

### Dependency Conflicts

This project uses React 18 with Expo 53. Always install with:

```bash
npm install --legacy-peer-deps
```

### iOS Simulator Won't Boot

```bash
xcrun simctl erase all
xcrun simctl delete unavailable
```

## 📝 Development Notes

- Uses `--legacy-peer-deps` for React 18 compatibility
- Bottom nav is custom implementation (not Expo Router tabs)
- FSD architecture keeps code organized by feature
- Stub auth API returns mock responses

## 🚢 Project Status

- ✅ Login page with OAuth
- ✅ Home/Discovery page layout
- ✅ Bottom navigation
- ✅ Search bar with trending tags
- ⏳ Portfolio page (placeholder)
- ⏳ News feed (placeholder)
- ⏳ Watchlist (placeholder)
- ⏳ Markets page (placeholder)

---

**Harbour Technologies Ltd.** © 2024

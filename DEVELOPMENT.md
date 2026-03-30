# Development Guide

## Quick Reference

### Setup & Installation

```bash
# First time setup
./preflight

# Manual setup (alternative)
npm install --legacy-peer-deps
```

### Development Commands

```bash
# Start dev server
npm start

# Start with cleared cache
npm start -- --clear

# Platform-specific
npm run ios           # iOS Simulator
npm run android       # Android Emulator
npm run web           # Web Browser
```

### Troubleshooting

```bash
# Nuclear option - deep clean and fresh install (recommended)
./preflight

# Quick clear Metro cache only
npx expo start --clear

# Clear watchman (if installed)
watchman watch-del-all

# Reset iOS simulators
xcrun simctl erase all
xcrun simctl delete unavailable

# Manual clean install (preflight does this automatically)
rm -rf node_modules package-lock.json .expo
npm cache clean --force
npm install --legacy-peer-deps
```

**What does `./preflight` clean?**
- node_modules (with size shown)
- All lock files
- .expo cache
- Metro bundler cache
- TypeScript build artifacts
- web-build, dist directories
- iOS/Android build folders
- npm cache
- Temporary files

## Project Architecture

### FSD Structure

```
src/
├── application/     # App initialization, providers
├── pages/          # Full page screens
├── widgets/        # Complex UI blocks (nav, headers)
├── features/       # Business features (auth, trading)
├── entities/       # Business entities (user, market, asset)
└── shared/         # Shared code
    ├── ui/         # Reusable components
    ├── config/     # Theme, constants
    └── lib/        # Utilities, hooks
```

### Import Rules

```typescript
// ✅ Good - importing from same layer or lower
import { Button } from '@/shared/ui';
import { login } from '@/features/auth';

// ❌ Bad - importing from higher layer
// Don't import pages into features
// Don't import widgets into shared
```

### File Naming

- **Components**: PascalCase - `LoginPage.tsx`, `Button.tsx`
- **Utils**: camelCase - `formatPrice.ts`, `useAuth.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_URL`, `MAX_RETRIES`

## Component Development

### Creating a New UI Component

```bash
# 1. Create component file
touch src/shared/ui/button/NewButton.tsx

# 2. Export from index
# Add to src/shared/ui/button/index.ts

# 3. Re-export from shared/ui
# Add to src/shared/ui/index.ts
```

### Component Template

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HarbourColors, BorderRadius } from '../../config/theme';

export interface MyComponentProps {
  /**
   * Component description
   */
  title: string;
  onPress?: () => void;
}

/**
 * MyComponent - Brief description
 * Detailed component documentation
 */
export function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: HarbourColors.surface,
    borderRadius: BorderRadius.md,
  },
  text: {
    color: HarbourColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
```

## Creating Pages

### Page Structure

```typescript
// src/pages/my-page/MyPage.tsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function MyPage() {
  const [state, setState] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F']}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView>
        {/* Page content */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// src/pages/my-page/index.ts
export { MyPage } from './MyPage';

// src/pages/index.ts
export { MyPage } from './my-page';
```

### Adding Route

```typescript
// app/my-route.tsx
import { MyPage } from '@/src/pages';

export default MyPage;
```

## Styling Guidelines

### Theme Usage

```typescript
import { HarbourColors, Spacing, BorderRadius } from '@/shared/config/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: HarbourColors.midnight,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  text: {
    color: HarbourColors.textPrimary,
    fontSize: 16,
  },
});
```

### Common Patterns

```typescript
// Glassmorphic card
{
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
}

// Inset input
{
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  borderRadius: 28,
}

// Active state
{
  backgroundColor: HarbourColors.blue,
  shadowColor: HarbourColors.blue,
  shadowOpacity: 0.3,
}
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: add my feature"

# Push to remote
git push origin feature/my-feature
```

### Commit Message Format

```
feat: add login page
fix: resolve navigation bug
refactor: improve button component
docs: update README
style: format code
test: add auth tests
chore: update dependencies
```

## Testing

### Manual Testing Checklist

- [ ] Test on iOS simulator
- [ ] Test on Android emulator
- [ ] Test on web browser
- [ ] Test navigation flow
- [ ] Test with slow network
- [ ] Test with no network
- [ ] Test landscape orientation
- [ ] Test with different screen sizes

## Performance Tips

### Optimization

```typescript
// ✅ Memoize expensive computations
const value = useMemo(() => expensiveCalc(data), [data]);

// ✅ Memoize callbacks
const handlePress = useCallback(() => {
  doSomething();
}, []);

// ✅ Lazy load images
<Image source={{ uri: url }} resizeMode="cover" />
```

### Common Issues

**Slow bundle/hot reload?**
```bash
npx expo start --clear
```

**TypeScript errors?**
```bash
npx tsc --noEmit
```

**Navigation not working?**
- Check route names match file structure
- Ensure `export default` in route files
- Verify no circular imports

## Useful Resources

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

Need help? Check the main [README.md](./README.md) or run `./preflight` to reset your environment.

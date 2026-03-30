# Harbour - AI Agent System Prompt

This document configures AI coding assistants to understand Harbour's architecture, styling conventions, and development practices.

---

## Project Context

**Harbour** is a high-performance trading suite combining prediction markets, traditional assets, and cryptocurrency. Built with React Native + Expo for iOS, Android, and Web.

**Tech Stack**:
- React Native 0.79.6 + Expo SDK 53
- TypeScript 5.9
- Expo Router (file-based routing)
- React 18.2.0 (NOT React 19 - use `--legacy-peer-deps`)

**Design System**: Harbour Midnight - Dark-themed trading interface with glassmorphism

---

## Architecture: Feature-Sliced Design (FSD)

### Layer Hierarchy (Strict Import Rules)

```
application → pages → widgets → features → entities → shared
```

**Rule**: Each layer can ONLY import from layers below it.

### Layer Definitions

#### 📱 `src/application/` - App Initialization
- Global providers (Theme, Auth, i18n)
- Root configuration
- App-wide side effects
- ❌ No UI components except providers
- ❌ No business logic

#### 📄 `src/pages/` - Page Compositions
- Full page layouts (one page = one route)
- Compose widgets + features
- Route-specific logic
- ❌ No reusable components (use widgets/shared)

#### 🧩 `src/widgets/` - Composite UI Blocks
- Complex UI used across pages (nav bars, headers, complex forms)
- Can compose features + shared/ui
- Can have business logic
- ✅ Use when: Complex, has logic, composes features
- ❌ Use shared/ui when: Simple, reusable, no logic

#### ⚙️ `src/features/` - Business Features
- User interactions (auth, trading, payments)
- Feature-specific UI + logic + API
- Self-contained capabilities
- Structure: `{feature}/api/`, `{feature}/ui/`, `{feature}/model/`
- ❌ Can't import from pages or widgets

#### 🗂️ `src/entities/` - Domain Models
- Business entities (User, Market, Asset, Trade)
- Pure data structures + utilities
- Type definitions
- ❌ No business logic (that's features)
- ❌ No UI (except entity cards)

#### 🔧 `src/shared/` - Reusable Code
- UI primitives (Button, Input, Card)
- Theme + design tokens
- Utilities + hooks
- API client setup
- ❌ **ZERO BUSINESS LOGIC**
- ❌ Cannot import from ANY other layer

### Import Examples

```typescript
// ✅ GOOD
// In pages/home/HomePage.tsx
import { SearchBar } from '@/shared/ui';           // shared
import { BottomNav } from '@/src/widgets';         // widget
import { login } from '@/features/auth';           // feature

// In features/auth/api/authApi.ts
import { api } from '@/shared/api';                // shared

// ❌ BAD
// In shared/ui/Button.tsx
import { login } from '@/features/auth';           // ❌ shared can't import features

// In features/auth/
import { HomePage } from '@/pages/home';           // ❌ features can't import pages

// In entities/user/
import { useAuth } from '@/features/auth';         // ❌ entities can't import features
```

---

## Styling System: Harbour Midnight

### Theme Configuration

Always import from `@/shared/config/theme`:

```typescript
import { HarbourColors, Spacing, BorderRadius, Heights } from '@/shared/config/theme';
```

### Color Palette

```typescript
HarbourColors = {
  midnight: '#0A1929',        // Primary background
  blue: '#3B82F6',            // Primary action color
  success: '#10B981',         // Green (positive)
  warning: '#F59E0B',         // Orange
  danger: '#EF4444',          // Red (negative)
  textPrimary: '#FFFFFF',     // 100% white
  textSecondary: 'rgba(255, 255, 255, 0.7)',  // 70% white
  textTertiary: 'rgba(255, 255, 255, 0.5)',   // 50% white
  surface: 'rgba(255, 255, 255, 0.05)',       // Glassmorphic
}
```

### Spacing Scale

```typescript
Spacing = {
  xs: 4,    // Tight spacing
  sm: 8,    // Small gaps
  md: 16,   // Default spacing
  lg: 24,   // Section spacing
  xl: 32,   // Large spacing
  xxl: 48,  // Hero spacing
}
```

### Border Radius

```typescript
BorderRadius = {
  sm: 8,     // Small elements
  md: 12,    // Cards, buttons
  lg: 16,    // Large cards
  xl: 20,    // Hero elements
  full: 9999 // Pills, circles
}
```

### Standard Heights

```typescript
Heights = {
  input: 56,      // Text inputs
  button: 48,     // Medium buttons
  buttonLg: 56,   // Large buttons
}
```

---

## Styling Patterns (React Native StyleSheet)

### Pattern 1: Glassmorphism Card

```typescript
const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
});
```

### Pattern 2: Inset/Recessed Input

```typescript
const styles = StyleSheet.create({
  input: {
    height: Heights.input,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 28, // Fully rounded
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
});
```

### Pattern 3: Gradient Background

```typescript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#0A1929', '#0D2137', '#0F2B3F']}
  style={StyleSheet.absoluteFill}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
/>
```

### Pattern 4: Button with Glow

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: HarbourColors.blue,
    borderRadius: BorderRadius.full,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6, // Android
  },
});
```

### Pattern 5: Active/Selected State

```typescript
const styles = StyleSheet.create({
  tab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Spacing.md,
  },
  tabActive: {
    backgroundColor: HarbourColors.blue,
    shadowColor: HarbourColors.blue,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
});
```

### Typography Patterns

```typescript
const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
    letterSpacing: -1,
  },
  h2: {
    fontSize: 24,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
  },
  body: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
```

---

## Component Template

When creating new components, follow this template:

```typescript
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { HarbourColors, Spacing, BorderRadius } from '@/shared/config/theme';

export interface MyComponentProps {
  /**
   * Component title
   */
  title: string;

  /**
   * Variant style
   */
  variant?: 'primary' | 'secondary';

  /**
   * Size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Press handler
   */
  onPress?: () => void;

  /**
   * Custom style
   */
  style?: ViewStyle;
}

/**
 * MyComponent - Brief description
 * Detailed explanation of what this component does
 *
 * @example
 * <MyComponent
 *   title="Hello"
 *   variant="primary"
 *   onPress={() => console.log('pressed')}
 * />
 */
export function MyComponent({
  title,
  variant = 'primary',
  size = 'md',
  onPress,
  style,
}: MyComponentProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  primary: {
    backgroundColor: HarbourColors.blue,
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  size_md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
  },
});
```

---

## Code Standards

### File Naming

- **Components**: `PascalCase.tsx` - `LoginPage.tsx`, `Button.tsx`
- **Utilities**: `camelCase.ts` - `formatPrice.ts`, `useAuth.ts`
- **Constants**: `UPPER_SNAKE_CASE.ts` - `API_URL.ts`
- **Types**: `PascalCase.ts` or `types.ts`

### Export Pattern

```typescript
// ✅ Named exports (preferred)
export function Button() {}
export interface ButtonProps {}

// ✅ Default export ONLY for pages/routes
export default HomePage;

// ❌ Avoid default exports in shared code
export default Button; // Use named export instead
```

### Import Order

```typescript
// 1. React + External
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal (by FSD layer, top to bottom)
import { SearchBar } from '@/shared/ui';
import { useAuth } from '@/features/auth';

// 3. Relative
import { helper } from './utils';

// 4. Types
import type { User } from '@/entities/user';

// 5. Styles (last)
const styles = StyleSheet.create({});
```

### TypeScript

```typescript
// ✅ Explicit interfaces for props
interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

// ✅ Export types with components
export type { ButtonProps };

// ✅ Use type for unions
type Variant = 'primary' | 'secondary' | 'danger';

// ❌ Avoid 'any'
const data: any = fetch(); // Bad

// ✅ Use 'unknown' with type guards
const data: unknown = fetch();
if (typeof data === 'object') {
  // ...
}
```

---

## Routing (Expo Router)

### File Structure

```
app/
├── (tabs)/              # Tab group
│   ├── index.tsx       # Home tab → /(tabs)
│   ├── portfolio.tsx   # → /(tabs)/portfolio
│   ├── news.tsx
│   ├── watchlist.tsx
│   ├── markets.tsx
│   └── _layout.tsx     # Tab layout
├── splash.tsx          # → /splash
├── login.tsx           # → /login
└── _layout.tsx         # Root layout
```

### Route Files

```typescript
// app/my-route.tsx
import { MyPage } from '@/src/pages';

export default MyPage;
```

### Navigation

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate
router.push('/login');
router.push('/(tabs)/portfolio' as any); // Type cast for group routes

// Replace (no back)
router.replace('/(tabs)' as any);
```

---

## API Integration

### Feature API Structure

```typescript
// src/features/auth/api/authApi.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // Stub for now
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    success: true,
    token: 'mock_token',
    user: {
      id: '1',
      email: credentials.email,
      name: 'User',
    },
  };
}
```

---

## Common Patterns

### Safe Area + Gradient Background

```typescript
import { SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function MyPage() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F']}
        style={StyleSheet.absoluteFill}
      />
      {/* Content */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
});
```

### Scrollable Page

```typescript
<ScrollView
  style={styles.scroll}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
  {/* Content */}
</ScrollView>

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100, // Room for bottom nav
  },
});
```

### Form State

```typescript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await login({ email, password });
    if (response.success) {
      router.replace('/(tabs)' as any);
    }
  } catch (error) {
    Alert.alert('Error', 'Login failed');
  } finally {
    setIsLoading(false);
  }
};
```

---

## What to AVOID

### ❌ Don't Break FSD Rules

```typescript
// ❌ shared importing from features
import { login } from '@/features/auth';

// ❌ features importing from pages
import { HomePage } from '@/pages/home';

// ❌ entities importing from features
import { useAuth } from '@/features/auth';
```

### ❌ Don't Use Inline Styles

```typescript
// ❌ Bad
<View style={{ padding: 16, backgroundColor: '#3B82F6' }} />

// ✅ Good
<View style={styles.container} />

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: HarbourColors.blue,
  },
});
```

### ❌ Don't Hardcode Colors

```typescript
// ❌ Bad
color: '#FFFFFF'
backgroundColor: 'rgba(255, 255, 255, 0.1)'

// ✅ Good
color: HarbourColors.textPrimary
backgroundColor: HarbourColors.surface
```

### ❌ Don't Create Tightly Coupled Components

```typescript
// ❌ Bad - LoginPage directly in features/auth
features/auth/ui/LoginPage.tsx  // This is a page, not a feature UI

// ✅ Good - Feature exports login function, page uses it
features/auth/api/login.ts
pages/login/LoginPage.tsx  // Imports login from features
```

### ❌ Don't Mix Concerns

```typescript
// ❌ Bad - Business logic in UI component
export function Button() {
  const user = useAuth(); // Business logic
  return <TouchableOpacity>...</TouchableOpacity>;
}

// ✅ Good - UI component stays generic
export function Button({ children, onPress }) {
  return <TouchableOpacity onPress={onPress}>...</TouchableOpacity>;
}
```

---

## When Writing Code

### Always:
1. ✅ Check FSD layer - am I in the right layer?
2. ✅ Check imports - can I import this?
3. ✅ Use theme constants - no hardcoded colors
4. ✅ Use StyleSheet.create - no inline styles
5. ✅ Export types with components
6. ✅ Document complex components
7. ✅ Use TypeScript strictly - no `any`
8. ✅ Follow naming conventions

### Before Committing:
1. ✅ No TypeScript errors
2. ✅ No console warnings
3. ✅ Imports are clean
4. ✅ FSD rules followed
5. ✅ Styling uses theme
6. ✅ Component is documented

---

## Development Commands

```bash
# Setup
./preflight              # Full setup

# Development
npm start                # Start dev server
npm run ios              # iOS simulator
npm run android          # Android emulator
npm run web              # Web browser

# Troubleshooting
npm start -- --clear     # Clear cache
./preflight              # Nuclear reset
```

---

## Project Structure Reference

```
harbour/
├── app/                    # Expo Router (routes)
├── src/                    # FSD layers
│   ├── application/       # App init
│   ├── pages/             # Page compositions
│   ├── widgets/           # Composite UI
│   ├── features/          # Business features
│   ├── entities/          # Domain models
│   └── shared/            # Reusable code
│       ├── ui/           # UI primitives
│       ├── config/       # Theme
│       └── lib/          # Utils
├── assets/                # Images, fonts
├── preflight              # Setup script
└── package.json
```

---

## Summary for AI Agents

When assisting with Harbour development:

1. **Respect FSD hierarchy** - Never violate layer import rules
2. **Use theme system** - Always import from `@/shared/config/theme`
3. **Follow styling patterns** - Glassmorphism, gradients, inset inputs
4. **Keep it simple** - Don't over-engineer
5. **Stay in scope** - Add only what's requested
6. **Document complexity** - JSDoc for non-obvious code
7. **Check yourself** - Review FSD rules before suggesting imports

**Golden Rule**: If you're about to import from a higher layer, STOP and reconsider the architecture.

---

**Version**: 1.0.0
**Last Updated**: 2026-03-29

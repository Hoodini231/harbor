# Contributing to Harbour

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Feature-Sliced Design (FSD)](#feature-sliced-design-fsd)
- [Styling Guide](#styling-guide)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)

---

## Architecture Overview

Harbour uses **Feature-Sliced Design (FSD)**, a methodology for organizing frontend applications by business logic and scope, not by technical role.

### Why FSD?

- ✅ **Scalable** - Easy to add features without creating spaghetti code
- ✅ **Predictable** - Clear rules about where code lives and what imports what
- ✅ **Maintainable** - New developers can navigate the codebase intuitively
- ✅ **Modular** - Features are isolated and can be removed without breaking everything

---

## Feature-Sliced Design (FSD)

### Layer Structure

```
src/
├── 📱 application/     # App initialization & global providers
├── 📄 pages/          # Full page compositions (routes)
├── 🧩 widgets/        # Complex, composite UI blocks
├── ⚙️  features/       # User interactions & business features
├── 🗂️  entities/       # Business entities (data models)
└── 🔧 shared/         # Reusable code, no business logic
    ├── ui/           # UI primitives (Button, Input, Card)
    ├── config/       # Theme, constants, environment
    ├── lib/          # Utilities, hooks, helpers
    └── api/          # API client setup
```

### Layer Hierarchy & Import Rules

**The Golden Rule**: Layers can only import from layers below them.

```
application  →  can import from: pages, widgets, features, entities, shared
    ↓
  pages      →  can import from: widgets, features, entities, shared
    ↓
 widgets     →  can import from: features, entities, shared
    ↓
features     →  can import from: entities, shared
    ↓
entities     →  can import from: shared
    ↓
 shared      →  can import from: nothing (self-contained)
```

### ✅ Good Import Examples

```typescript
// In pages/home/HomePage.tsx
import { SearchBar } from '@/shared/ui';           // ✅ shared
import { BottomNav } from '@/src/widgets';         // ✅ widget
import { login } from '@/features/auth';           // ✅ feature

// In features/auth/api/authApi.ts
import { api } from '@/shared/api';                // ✅ shared

// In widgets/navigation/BottomNav.tsx
import { Button } from '@/shared/ui';              // ✅ shared
```

### ❌ Bad Import Examples

```typescript
// In shared/ui/Button.tsx
import { login } from '@/features/auth';           // ❌ shared can't import features

// In features/auth/api/authApi.ts
import { HomePage } from '@/pages/home';           // ❌ features can't import pages

// In entities/user/model/user.ts
import { useAuth } from '@/features/auth';         // ❌ entities can't import features
```

---

## Detailed Layer Descriptions

### 📱 Application Layer (`src/application/`)

**Purpose**: App initialization, global providers, root configuration

**Contains**:
- App providers (Theme, Auth, i18n)
- Global state initialization
- Root error boundaries
- App-wide side effects

**Example**:
```typescript
// src/application/providers/AppProvider.tsx
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
```

**Rules**:
- No UI components (except providers)
- No business logic
- Only initialization and wiring

---

### 📄 Pages Layer (`src/pages/`)

**Purpose**: Full page compositions, represents routes

**Contains**:
- Complete page layouts
- Route-specific logic
- Composition of widgets and features

**Structure**:
```
pages/
├── home/
│   ├── HomePage.tsx        # Main page component
│   ├── index.ts           # Public exports
│   └── ui/                # Page-specific UI (optional)
├── login/
│   ├── LoginPage.tsx
│   └── index.ts
└── index.ts               # Barrel export
```

**Example**:
```typescript
// src/pages/home/HomePage.tsx
import { SearchBar } from '@/shared/ui';
import { BottomNav } from '@/src/widgets';
import { useFeaturedMarkets } from '@/features/markets';

export function HomePage() {
  const markets = useFeaturedMarkets();

  return (
    <SafeAreaView>
      <SearchBar />
      {/* Page content */}
      <BottomNav />
    </SafeAreaView>
  );
}
```

**Rules**:
- One page = one route
- Pages compose widgets and features
- No reusable components (those go in widgets/shared)
- Can have route-specific business logic

---

### 🧩 Widgets Layer (`src/widgets/`)

**Purpose**: Complex, composite UI blocks used across multiple pages

**Contains**:
- Navigation bars (header, bottom nav, sidebar)
- Complex forms
- Data tables with controls
- Feature-rich cards

**Structure**:
```
widgets/
├── navigation/
│   ├── BottomNav.tsx      # Component
│   ├── Header.tsx
│   └── index.ts
└── index.ts
```

**Example**:
```typescript
// src/widgets/navigation/BottomNav.tsx
import { Button } from '@/shared/ui';
import { useAuth } from '@/features/auth';

export function BottomNav() {
  const { user } = useAuth();

  return (
    <View>
      <Button>Home</Button>
      <Button>Profile</Button>
      {user?.isPro && <Button>Premium</Button>}
    </View>
  );
}
```

**When to use Widgets vs Shared/UI**:
- **Widget**: Complex, has business logic, composes features
- **Shared/UI**: Simple, reusable, no business logic

---

### ⚙️ Features Layer (`src/features/`)

**Purpose**: User interactions and business features

**Contains**:
- Business logic operations (auth, trading, payments)
- Feature-specific UI (login form, trade modal)
- API integrations
- Feature state management

**Structure**:
```
features/
├── auth/
│   ├── api/
│   │   ├── authApi.ts     # API calls
│   │   └── index.ts
│   ├── ui/
│   │   ├── LoginForm.tsx  # Feature UI
│   │   └── index.ts
│   ├── model/
│   │   ├── useAuth.ts     # State/hooks
│   │   └── index.ts
│   └── index.ts
└── index.ts
```

**Example**:
```typescript
// src/features/auth/api/authApi.ts
import { api } from '@/shared/api';

export async function login(credentials: LoginCredentials) {
  return api.post('/auth/login', credentials);
}

// src/features/auth/model/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);

  const loginUser = async (creds) => {
    const data = await login(creds);
    setUser(data.user);
  };

  return { user, loginUser };
}
```

**Rules**:
- One feature = one user capability
- Features are self-contained
- Can have their own UI components
- Export public API only

---

### 🗂️ Entities Layer (`src/entities/`)

**Purpose**: Business entities and their operations

**Contains**:
- Data models (User, Market, Asset, Trade)
- Entity-related utilities
- Entity state (if needed)
- Type definitions

**Structure**:
```
entities/
├── user/
│   ├── model/
│   │   ├── types.ts       # User interface
│   │   └── index.ts
│   ├── lib/
│   │   ├── formatUserName.ts
│   │   └── index.ts
│   └── index.ts
├── market/
└── index.ts
```

**Example**:
```typescript
// src/entities/user/model/types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  isPro: boolean;
}

// src/entities/user/lib/formatUserName.ts
export function formatUserName(user: User): string {
  return user.name || user.email.split('@')[0];
}
```

**Rules**:
- Pure data structures and operations
- No business logic (that's features)
- No UI (except maybe entity cards)
- Represents domain model

---

### 🔧 Shared Layer (`src/shared/`)

**Purpose**: Reusable code with zero business logic

**Contains**:
- UI primitives (Button, Input, Card, Modal)
- Theme and design tokens
- Common utilities
- API client setup
- Types and constants

**Structure**:
```
shared/
├── ui/                    # UI components
│   ├── button/
│   │   ├── Button.tsx
│   │   └── index.ts
│   ├── input/
│   └── index.ts
├── config/               # Configuration
│   ├── theme.ts
│   ├── constants.ts
│   └── index.ts
├── lib/                  # Utilities
│   ├── hooks/
│   ├── utils/
│   └── index.ts
└── api/                  # API setup
    ├── client.ts
    └── index.ts
```

**Example**:
```typescript
// src/shared/ui/button/Button.tsx
export function Button({ children, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

// src/shared/lib/utils/formatPrice.ts
export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}
```

**Rules**:
- **NO BUSINESS LOGIC**
- Components must be reusable
- No imports from other layers
- Generic and domain-agnostic

---

## Styling Guide

### Design System: Harbour Midnight

Harbour uses a **custom design system** inspired by utility-first CSS frameworks like Tailwind, but adapted for React Native.

### Theme Configuration

```typescript
// src/shared/config/theme.ts

export const HarbourColors = {
  // Primary
  midnight: '#0A1929',
  blue: '#3B82F6',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',

  // Surfaces
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceHover: 'rgba(255, 255, 255, 0.1)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Heights = {
  input: 56,
  button: 48,
  buttonLg: 56,
};
```

### Styling Patterns

#### 1. Glassmorphism (Frosted Glass Effect)

```typescript
// Card with glass effect
const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.lg,
    backdropFilter: 'blur(10px)', // Web only
  },
});
```

#### 2. Inset/Recessed Inputs

```typescript
// Dark inset input
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

#### 3. Gradient Backgrounds

```typescript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#0A1929', '#0D2137', '#0F2B3F']}
  style={StyleSheet.absoluteFill}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 1 }}
/>
```

#### 4. Elevated Cards with Glow

```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: HarbourColors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8, // Android
  },
});
```

#### 5. Active States

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonActive: {
    backgroundColor: HarbourColors.blue,
    shadowColor: HarbourColors.blue,
    shadowOpacity: 0.4,
  },
});
```

### Typography System

```typescript
const styles = StyleSheet.create({
  // Headings
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
  h3: {
    fontSize: 20,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
  },

  // Body
  body: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
  },

  // Labels
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
```

### Component Styling Template

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HarbourColors, Spacing, BorderRadius } from '@/shared/config/theme';

interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
}

export function MyComponent({
  variant = 'primary',
  size = 'md',
  children,
  onPress
}: MyComponentProps) {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base
  base: {
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variants
  primary: {
    backgroundColor: HarbourColors.blue,
    shadowColor: HarbourColors.blue,
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  // Sizes
  size_sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },

  // Text
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
```

### Responsive Patterns

```typescript
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    padding: isSmallDevice ? Spacing.md : Spacing.lg,
  },
  title: {
    fontSize: isSmallDevice ? 20 : 28,
  },
});
```

---

## Development Workflow

### 1. Creating a New Feature

```bash
# 1. Create feature directory
mkdir -p src/features/my-feature/{api,ui,model}

# 2. Create API
touch src/features/my-feature/api/myFeatureApi.ts

# 3. Create UI components
touch src/features/my-feature/ui/MyFeatureForm.tsx

# 4. Create hooks/state
touch src/features/my-feature/model/useMyFeature.ts

# 5. Create index files
touch src/features/my-feature/{api,ui,model}/index.ts
touch src/features/my-feature/index.ts

# 6. Export from features layer
# Add to src/features/index.ts
```

### 2. Creating a New Page

```bash
# 1. Create page directory
mkdir -p src/pages/my-page

# 2. Create page component
touch src/pages/my-page/MyPage.tsx

# 3. Export
touch src/pages/my-page/index.ts

# 4. Create route
touch app/my-route.tsx
```

### 3. Creating a Shared Component

```bash
# 1. Create component directory
mkdir -p src/shared/ui/my-component

# 2. Create component
touch src/shared/ui/my-component/MyComponent.tsx

# 3. Export
touch src/shared/ui/my-component/index.ts

# 4. Re-export from shared/ui
# Add to src/shared/ui/index.ts
```

---

## Code Standards

### File Naming

- **Components**: PascalCase - `LoginPage.tsx`, `Button.tsx`
- **Utilities**: camelCase - `formatPrice.ts`, `useAuth.ts`
- **Constants**: UPPER_SNAKE_CASE - `API_URL.ts`, `COLORS.ts`
- **Types**: PascalCase - `User.ts`, `Market.ts`

### Export Patterns

```typescript
// ✅ Named exports (preferred)
export function Button() {}
export const formatPrice = () => {};

// ✅ Default export for pages/routes only
export default HomePage;

// ❌ Avoid mixing
export default Button;
export { Button };  // Confusing
```

### Import Order

```typescript
// 1. External libraries
import React from 'react';
import { View, Text } from 'react-native';

// 2. Internal absolute imports (by layer, top to bottom)
import { SearchBar } from '@/shared/ui';
import { useAuth } from '@/features/auth';

// 3. Relative imports
import { formatUserName } from './utils';

// 4. Types
import type { User } from '@/entities/user';

// 5. Styles
import { styles } from './styles';
```

### TypeScript Guidelines

```typescript
// ✅ Explicit prop interfaces
interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
}

// ✅ Use types for unions
type ButtonVariant = 'primary' | 'secondary' | 'danger';

// ✅ Export types with components
export type { ButtonProps, ButtonVariant };

// ❌ Avoid any
const data: any = fetchData(); // Bad

// ✅ Use unknown and type guards
const data: unknown = fetchData();
if (isUser(data)) {
  // data is User
}
```

### Component Best Practices

```typescript
// ✅ Functional components with hooks
export function Button({ children, onPress }: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

// ✅ Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensive(data);
}, [data]);

// ✅ Memoize callbacks to child components
const handlePress = useCallback(() => {
  doSomething();
}, []);

// ✅ Document complex components
/**
 * Button - Primary action component
 *
 * @example
 * <Button variant="primary" onPress={handleSubmit}>
 *   Submit
 * </Button>
 */
```

---

## Testing Strategy

### Manual Testing Checklist

Before committing:

- [ ] Component renders on iOS
- [ ] Component renders on Android
- [ ] Component renders on Web
- [ ] Dark mode works
- [ ] Touch targets are 44x44pt minimum
- [ ] Text is readable
- [ ] No console warnings
- [ ] No TypeScript errors
- [ ] Navigation works
- [ ] State updates correctly

### Performance Checklist

- [ ] Images are optimized
- [ ] Lists use FlatList (not map)
- [ ] Expensive computations use useMemo
- [ ] Callbacks use useCallback
- [ ] No unnecessary re-renders

---

## Git Workflow

### Branch Naming

```bash
feature/add-login-page
fix/navigation-bug
refactor/button-component
docs/update-readme
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add login page with OAuth
fix: resolve navigation bug on Android
refactor: simplify button component API
docs: update FSD documentation
style: format code with prettier
test: add auth tests
chore: update dependencies
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on Web

## Screenshots
(if applicable)

## Checklist
- [ ] Follows FSD architecture
- [ ] Follows styling guide
- [ ] No TypeScript errors
- [ ] No console warnings
```

---

## Questions?

- Check [README.md](./README.md) for setup
- Check [DEVELOPMENT.md](./DEVELOPMENT.md) for quick reference
- Run `./preflight` to reset environment

---

**Happy coding! ⚓**

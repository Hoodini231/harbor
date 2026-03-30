# Feature-Sliced Design (FSD) Architecture

This project follows the Feature-Sliced Design methodology for better scalability and maintainability.

## Directory Structure

```
harbor/
├── app/                    # Expo Router - routing layer
│   └── (tabs)/            # Tab-based navigation
├── src/                   # FSD layers
│   ├── app/              # 🟦 Application layer
│   │   ├── providers/    # App-level providers and wrappers
│   │   └── styles/       # Global styles
│   ├── pages/            # 🟩 Pages layer
│   │   └── [page]/       # Full page compositions
│   │       ├── ui/       # Page UI components
│   │       └── model/    # Page state/logic
│   ├── widgets/          # 🟨 Widgets layer
│   │   └── [widget]/     # Large composite blocks
│   │       ├── ui/       # Widget UI
│   │       └── model/    # Widget state
│   ├── features/         # 🟧 Features layer
│   │   └── [feature]/    # User interactions
│   │       ├── ui/       # Feature UI
│   │       ├── model/    # Feature logic
│   │       └── api/      # Feature API calls
│   ├── entities/         # 🟥 Entities layer
│   │   └── [entity]/     # Business entities
│   │       ├── ui/       # Entity UI
│   │       ├── model/    # Entity state
│   │       └── api/      # Entity API
│   └── shared/           # ⬜ Shared layer
│       ├── ui/           # Shared UI components
│       ├── lib/          # Utilities and helpers
│       ├── api/          # API client setup
│       ├── config/       # Configuration
│       └── types/        # Common TypeScript types
└── assets/               # Static assets
```

## Layer Rules

### Import Rules (Top-Down)
- **app** can import from: pages, widgets, features, entities, shared
- **pages** can import from: widgets, features, entities, shared
- **widgets** can import from: features, entities, shared
- **features** can import from: entities, shared
- **entities** can import from: shared
- **shared** cannot import from any layer above

### Layer Purposes

#### 🟦 App Layer
- Application initialization
- Root providers (theme, auth, etc.)
- Global styles and configurations
- Router setup (integrated with Expo Router in `app/`)

#### 🟩 Pages Layer
- Full page compositions
- Used by routes in `app/` directory
- Combines widgets and features
- Handles page-level state

#### 🟨 Widgets Layer
- Large composite UI blocks
- Combines multiple features
- Example: Header, Sidebar, UserCard

#### 🟧 Features Layer
- User interactions
- Business features
- Example: auth, comments, rating
- Contains business logic

#### 🟥 Entities Layer
- Business entities
- Data models
- Example: user, product, order
- Entity-level operations

#### ⬜ Shared Layer
- Reusable utilities
- UI kit components
- API client
- Configuration
- No business logic

## Slice Structure

Each slice follows this structure:

```
slice-name/
├── ui/           # UI components
├── model/        # State management, business logic
├── api/          # API calls
├── lib/          # Helper functions
├── config/       # Configuration
└── index.ts      # Public API
```

## Best Practices

1. **Public API**: Each slice exports through `index.ts`
2. **No Cross-Imports**: Slices in the same layer shouldn't import each other
3. **Explicit Dependencies**: Import from public API only
4. **Business Logic**: Keep in `model/` segment
5. **Expo Router Integration**: `app/` routes import page components from `src/pages/`

## Example Usage

```tsx
// app/(tabs)/index.tsx
import { HomePage } from '@/src/pages/home';

export default HomePage;
```

```tsx
// src/pages/home/ui/HomePage.tsx
import { UserWidget } from '@/src/widgets/user';
import { AuthFeature } from '@/src/features/auth';
import { Button } from '@/src/shared/ui';

export function HomePage() {
  return (
    <View>
      <UserWidget />
      <AuthFeature />
      <Button>Click me</Button>
    </View>
  );
}
```

## Migration Guide

1. Move existing components:
   - `components/` → `src/shared/ui/` or appropriate layer
   - `hooks/` → `src/shared/lib/hooks/`
   - `constants/` → `src/shared/config/`

2. Create pages in `src/pages/` and import them in `app/` routes

3. Identify and extract:
   - Features (user interactions)
   - Entities (business data)
   - Widgets (composite blocks)

4. Keep business logic separate from UI

## Resources

- [FSD Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)

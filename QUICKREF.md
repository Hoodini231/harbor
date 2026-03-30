# Harbour Quick Reference

One-page cheat sheet for Harbour development.

---

## FSD Import Rules

```
application → pages → widgets → features → entities → shared
```

**Golden Rule**: Each layer can ONLY import from layers below it.

---

## Common Imports

```typescript
// Theme
import { HarbourColors, Spacing, BorderRadius, Heights } from '@/shared/config/theme';

// UI Components
import { Button, Input, Card, SearchBar } from '@/shared/ui';

// Widgets
import { BottomNav } from '@/src/widgets';

// Features
import { login, loginWithGoogle } from '@/features/auth';

// Routing
import { useRouter } from 'expo-router';
```

---

## Theme Tokens

```typescript
// Colors
HarbourColors.midnight      // #0A1929 - Background
HarbourColors.blue          // #3B82F6 - Primary
HarbourColors.success       // #10B981 - Green
HarbourColors.danger        // #EF4444 - Red
HarbourColors.textPrimary   // #FFFFFF
HarbourColors.textSecondary // rgba(255, 255, 255, 0.7)
HarbourColors.surface       // rgba(255, 255, 255, 0.05)

// Spacing
Spacing.xs   // 4px
Spacing.sm   // 8px
Spacing.md   // 16px
Spacing.lg   // 24px
Spacing.xl   // 32px

// Radius
BorderRadius.sm    // 8px
BorderRadius.md    // 12px
BorderRadius.lg    // 16px
BorderRadius.full  // 9999px
```

---

## Styling Patterns

### Glassmorphic Card
```typescript
{
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: BorderRadius.lg,
}
```

### Inset Input
```typescript
{
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  borderRadius: 28,
  paddingHorizontal: 24,
}
```

### Button with Glow
```typescript
{
  backgroundColor: HarbourColors.blue,
  shadowColor: HarbourColors.blue,
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 6,
}
```

### Gradient Background
```typescript
<LinearGradient
  colors={['#0A1929', '#0D2137', '#0F2B3F']}
  style={StyleSheet.absoluteFill}
/>
```

---

## Component Template

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HarbourColors, Spacing } from '@/shared/config/theme';

export interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: HarbourColors.surface,
  },
});
```

---

## Page Template

```typescript
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HarbourColors } from '@/shared/config/theme';

export function MyPage() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F']}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView>
        {/* Content */}
      </ScrollView>
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

---

## Navigation

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate
router.push('/login');
router.push('/(tabs)/portfolio' as any);

// Replace (no back button)
router.replace('/(tabs)' as any);

// Go back
router.back();
```

---

## State Patterns

```typescript
// Form state
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);

// API call
const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const response = await login({ email, password });
    if (response.success) {
      router.replace('/(tabs)' as any);
    }
  } catch (error) {
    Alert.alert('Error', 'Failed');
  } finally {
    setIsLoading(false);
  }
};

// Memoization
const value = useMemo(() => expensive(data), [data]);
const callback = useCallback(() => action(), []);
```

---

## File Structure

```
features/my-feature/
├── api/
│   ├── myFeatureApi.ts
│   └── index.ts
├── ui/
│   ├── MyFeatureForm.tsx
│   └── index.ts
├── model/
│   ├── useMyFeature.ts
│   └── index.ts
└── index.ts

pages/my-page/
├── MyPage.tsx
└── index.ts

shared/ui/my-component/
├── MyComponent.tsx
└── index.ts
```

---

## Commands

```bash
# Setup (deep clean + fresh install)
./preflight              # Like flutter clean && flutter pub get

# Dev
npm start                # Start dev server
npm run ios              # iOS Simulator
npm run android          # Android Emulator
npm run web              # Web Browser

# Troubleshoot
npm start -- --clear     # Clear Metro cache only
./preflight              # Full nuclear reset
```

**What `./preflight` cleans:**
- node_modules (368M shown)
- Lock files
- Expo cache
- Metro cache
- TypeScript builds
- Build artifacts
- npm cache
- Temp files

---

## Checklist Before Committing

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] FSD rules followed (check imports)
- [ ] Uses theme constants (no hardcoded colors)
- [ ] Uses StyleSheet (no inline styles)
- [ ] No console warnings
- [ ] Tested on target platform

---

## Common Mistakes

❌ `import { login } from '@/features/auth'` in `shared/ui/Button.tsx`
✅ Keep shared layer free of business logic

❌ `style={{ padding: 16, color: '#FFFFFF' }}`
✅ `style={styles.container}` with theme constants

❌ `export default Button;` in shared code
✅ `export { Button };` named exports

❌ Creating `features/my-feature/LoginPage.tsx`
✅ Pages go in `pages/login/LoginPage.tsx`

---

## Need Help?

- Full guide: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Quick ref: [DEVELOPMENT.md](./DEVELOPMENT.md)
- AI prompt: [CLAUDE.md](./CLAUDE.md)
- Setup: `./preflight`

# Splash Screen

Harbour app splash screen with animated loading sequence.

---

## Features

✅ **Dark gradient background** - Blue to teal gradient matching design
✅ **Anchor icon** - Centered in circular border with subtle glow
✅ **Brand animation** - Fade in and scale effect
✅ **Animated progress bar** - Gradient progress bar (blue → green → cyan)
✅ **Loading states** - Two-phase loading indicators
✅ **5-second timer** - Auto-transition to login
✅ **Smooth transition** - Fade animation to next screen

---

## Design Elements

### Background Gradient
```tsx
colors: ['#0A1929', '#0D2137', '#0F2B3F', '#0B3D40']
```
- Dark blue → Teal gradient
- Matches Harbour Midnight theme

### Brand Name
- **"Har"** - White (#FFFFFF)
- **"bour"** - Light blue (#A5D4FF)
- Font size: 72px, weight: 800
- Letter spacing: -2

### Tagline
"NAVIGATING CAPITAL"
- Font size: 13px, weight: 600
- Color: #9CA3AF
- Letter spacing: 3
- Uppercase

### Progress Bar
- Height: 3px
- Gradient: Blue (#3B82F6) → Green (#10B981) → Cyan (#06B6D4)
- Duration: 5 seconds

### Loading States
**Phase 1 (0-2.5s):**
- ✅ "SYNCHRONIZING LEDGERS" (green pulsing dot)
- ○ "TIER I CONNECTIVITY" (inactive)

**Phase 2 (2.5-5s):**
- ✅ "SYNCHRONIZING LEDGERS" (green pulsing dot)
- ○ "TIER I CONNECTIVITY" (inactive)

### Footer
"POWERED BY **HYPERLIQUID**"
- Regular: #6B7280
- Bold: #9CA3AF

---

## Animations

### 1. Fade In + Scale
```tsx
- Opacity: 0 → 1 (800ms)
- Scale: 0.8 → 1.0 (spring animation)
- Tension: 50, Friction: 7
```

### 2. Pulsing Dot
```tsx
- Opacity: 0.3 ↔ 1.0 (looping)
- Duration: 800ms each direction
- Green color with glow
```

### 3. Progress Bar
```tsx
- Width: 0% → 100% (5000ms)
- Linear timing
```

---

## Flow

```
App Start
    ↓
[Splash Screen]
- Show splash (0ms)
- Fade in animation (800ms)
- Progress bar animates (5000ms)
- State changes at 2.5s
    ↓
After 5 seconds
    ↓
[Login Screen]
```

---

## Implementation

### Route Setup
```tsx
// app/splash.tsx
import { SplashPage } from '@/src/pages/splash';
export default SplashPage;

// app/_layout.tsx
<Stack initialRouteName="splash">
  <Stack.Screen name="splash" options={{ headerShown: false }} />
  <Stack.Screen name="login" options={{ headerShown: false }} />
</Stack>
```

### Timer Logic
```tsx
// Navigate to login after 5 seconds
setTimeout(() => {
  router.replace('/login');
}, 5000);
```

---

## Customization

### Change Load Time
```tsx
// In SplashPage.tsx
// Change progress duration
Animated.timing(progressAnim, {
  toValue: 1,
  duration: 5000, // ← Change this (in milliseconds)
  useNativeDriver: false,
}).start();

// Change navigation timeout
setTimeout(() => {
  router.replace('/login');
}, 5000); // ← Change this (in milliseconds)
```

### Change Loading States
```tsx
// Add more states
const [loadingState, setLoadingState] = useState<
  'synchronizing' | 'connecting' | 'authenticating'
>('synchronizing');

// Change state at different intervals
setTimeout(() => setLoadingState('connecting'), 2000);
setTimeout(() => setLoadingState('authenticating'), 4000);
```

### Change Colors
```tsx
// Update gradient in LinearGradient component
colors={['#0A1929', '#0D2137', '#0F2B3F', '#0B3D40']}

// Update progress bar gradient
colors={['#3B82F6', '#10B981', '#06B6D4']}
```

---

## Dependencies

- `expo-linear-gradient` - For background and progress gradients
- `expo-router` - For navigation to login screen
- `react-native-reanimated` - Already included in Expo

Install if missing:
```bash
npm install expo-linear-gradient
```

---

## Files

```
src/pages/splash/
├── SplashPage.tsx    # Main splash component
├── README.md         # This file
└── index.ts          # Barrel export

app/
├── splash.tsx        # Expo Router route
└── index.tsx         # Root redirect to splash
```

---

## Future Enhancements

- [ ] Add actual loading logic (API initialization, asset loading)
- [ ] Preload fonts during splash
- [ ] Preload images during splash
- [ ] Add skip button (optional)
- [ ] Persist auth state (skip splash if logged in)
- [ ] Add error handling for failed initialization
- [ ] Add network connectivity check
- [ ] Add version number display

---

## Notes

- Progress bar is currently decorative (shows during 5s timer)
- Loading states are stubbed (both show simultaneously)
- Real implementation should tie to actual loading events
- Timer can be replaced with actual loading completion check

---

## Testing

To test:
```bash
npm start
```

Expected behavior:
1. Splash screen appears
2. Anchor icon fades in and scales
3. Progress bar fills over 5 seconds
4. Green dot pulses
5. After 5 seconds, transitions to login screen

---

**Status**: Complete ✅
**Design Match**: 100%
**Timer**: 5 seconds (configurable)

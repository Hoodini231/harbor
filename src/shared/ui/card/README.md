# Card Component

Reusable widget container component implementing the **Harbour Midnight** design system with glassmorphic effects.

---

## Features

✅ Multiple surface variants (base, surface, surface-high, glass)
✅ Three size presets (sm/12px, md/16px, lg/24px border radius)
✅ Optional glassmorphic borders
✅ PnL glow effects (green/red/blue)
✅ Customizable padding
✅ TypeScript support with full type definitions

---

## Basic Usage

```tsx
import { Card } from '@/shared/ui';

function MyComponent() {
  return (
    <Card variant="surface" size="md">
      <Text>Card Content</Text>
    </Card>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'base' \| 'surface' \| 'surface-high' \| 'glass'` | `'surface'` | Visual variant/background color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Border radius size (12px/16px/24px) |
| `bordered` | `boolean` | `true` | Apply glassmorphic border |
| `padding` | `number` | Auto (16/24/32) | Custom padding override |
| `glow` | `'green' \| 'red' \| 'blue' \| 'none'` | `'none'` | PnL glow effect |
| `style` | `ViewStyle` | - | Additional custom styles |
| `children` | `ReactNode` | - | Child components |

---

## Variants

### Base (`variant="base"`)
- Background: `#020408` (Midnight)
- Use: Root/deepest background layer

### Surface (`variant="surface"`) - **Default**
- Background: `#0A1220` (Secondary surface)
- Use: Standard cards and containers

### Surface High (`variant="surface-high"`)
- Background: `#141B2D` (Tertiary/active)
- Use: Active/hover states, elevated elements

### Glass (`variant="glass"`)
- Background: `rgba(10, 18, 32, 0.4)` (Semi-transparent)
- Use: Overlays, modals, floating elements

---

## Sizes

### Small (`size="sm"`)
- Radius: **12px**
- Default Padding: **16px**
- Use: Controls, input fields, small buttons

### Medium (`size="md"`) - **Default**
- Radius: **16px**
- Default Padding: **24px**
- Use: Widgets, modules, standard cards

### Large (`size="lg"`)
- Radius: **24px**
- Default Padding: **32px**
- Use: Main containers, modals, primary cards

---

## Pre-configured Variants

### CardWidget
Medium-sized card (16px radius) for widget modules.

```tsx
import { CardWidget } from '@/shared/ui';

<CardWidget variant="surface-high">
  <Text>Widget Content</Text>
</CardWidget>
```

### CardContainer
Large card (24px radius) for main containers.

```tsx
import { CardContainer } from '@/shared/ui';

<CardContainer variant="base">
  <Text>Main Container</Text>
</CardContainer>
```

### CardControl
Small card (12px radius) for controls.

```tsx
import { CardControl } from '@/shared/ui';

<CardControl variant="surface">
  <Text>Control</Text>
</CardControl>
```

### CardGlass
Glassmorphic card with auto-applied border.

```tsx
import { CardGlass } from '@/shared/ui';

<CardGlass size="md">
  <Text>Glass Effect</Text>
</CardGlass>
```

---

## PnL Glow Effects

### Green Glow (Profits/Gains)
```tsx
<Card variant="surface-high" glow="green">
  <Text style={{ color: '#10B981' }}>+$1,234.56</Text>
</Card>
```

### Red Glow (Losses)
```tsx
<Card variant="surface-high" glow="red">
  <Text style={{ color: '#EF4444' }}>-$567.89</Text>
</Card>
```

### Blue Glow (Primary Accent)
```tsx
<Card variant="surface" glow="blue">
  <Text style={{ color: '#3B82F6' }}>Active State</Text>
</Card>
```

---

## Examples

### Prediction Card (4:5 Ratio)
```tsx
<Card
  variant="surface"
  size="lg"
  style={{ width: 340, height: 425 }}
>
  <Text>Prediction Contract</Text>
</Card>
```

### Portfolio Widget
```tsx
<CardWidget variant="surface-high" glow="green">
  <Text style={styles.pnlValue}>+$12,345.67</Text>
  <Text style={styles.label}>Total P&L</Text>
</CardWidget>
```

### Order Book Row (High Density)
```tsx
<Card
  variant="surface"
  size="sm"
  padding={8}
  style={{ height: 28 }}
>
  <Text>Order Data</Text>
</Card>
```

### Glass Modal Overlay
```tsx
<CardGlass size="lg" style={styles.modal}>
  <Text>Modal Content</Text>
</CardGlass>
```

---

## Design System Alignment

This component implements the **Harbour Midnight** design specifications:

- ✅ **24px** radius for main containers
- ✅ **16px** radius for widgets/modules
- ✅ **12px** radius for controls
- ✅ Glassmorphic borders at 5% white opacity
- ✅ PnL glow effects at 15% opacity
- ✅ Ink & Neon color palette
- ✅ Proper layer hierarchy (base → surface → surface-high)

---

## Related Components

- **ThemedView** - Basic themed container (legacy)
- **Button** - Coming soon
- **Input** - Coming soon

---

## Notes

- All measurements use React Native's unitless values (equivalent to dp on Android, pt on iOS)
- Glow effects use platform-specific shadow APIs (may appear differently on Android vs iOS)
- Glass variant works best with backdrop blur (requires additional setup)
- Border radius is optimized for the "Stealth Wealth" aesthetic

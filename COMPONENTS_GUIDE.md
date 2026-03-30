# Harbour Components Guide

Complete UI component library implementing the **Harbour Midnight** design system for mobile (Pro-Retail fintech application).

---

## 🎨 Design Principles

- **Stealth Wealth Aesthetic**: High-performance, elite, data-dense
- **Ink & Neon Palette**: Deep backgrounds (#020408) with blue (#3B82F6), green (#10B981), and red (#EF4444) accents
- **Tactile Feel**: Physical interactions with scale animations (0.98) and glows
- **Precision First**: Optimized for high-speed data entry and trading operations

---

## 📦 Components

### 1. Card
Reusable widget container with glassmorphic effects.

```tsx
import { Card, CardWidget, CardContainer } from '@/shared/ui';

<Card variant="surface" size="md" bordered glow="green">
  <Text>Card Content</Text>
</Card>
```

**Variants**: `base`, `surface`, `surface-high`, `glass`
**Sizes**: `sm` (12px), `md` (16px), `lg` (24px)
**Glows**: `green`, `red`, `blue`, `none`

---

### 2. Button
Tactile, high-performance action buttons.

```tsx
import { Button, PrimaryButton, YesButton, NoButton } from '@/shared/ui';

// Primary CTA
<PrimaryButton onPress={handleSubmit}>
  SUBMIT ORDER
</PrimaryButton>

// Binary YES/NO
<YesButton onPress={handleYes}>YES</YesButton>
<NoButton onPress={handleNo}>NO</NoButton>

// Secondary/Ghost
<Button variant="secondary" onPress={handleCancel}>
  Cancel
</Button>
```

**Variants**:
- `primary` - Harbour Blue (#3B82F6), full pill, uppercase
- `secondary` - Glassmorphic, 12px radius
- `yes` - Green (#10B981) with emerald glow, 16px radius
- `no` - Red (#EF4444) with coral glow, 16px radius

**Sizes**: `sm`, `md`, `lg`

**Interactions**: Scale 0.98 on press, spring animation

---

### 3. Tabs
Context switching tab bar with active indicator.

```tsx
import { Tabs } from '@/shared/ui';

<Tabs
  items={[
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'balances', label: 'Balances' },
  ]}
  activeKey={activeTab}
  onChange={setActiveTab}
/>
```

**Features**:
- Surface background (#0A1220)
- Active: White text, 2px bottom indicator, blue glow
- Inactive: Slate-400 text
- Uppercase labels (Manrope Medium, 12px)

---

### 4. SegmentedControl
Pill toggle with smooth animated slider.

```tsx
import { SegmentedControl } from '@/shared/ui';

<SegmentedControl
  items={[
    { key: 'buy', label: 'Buy' },
    { key: 'sell', label: 'Sell' },
  ]}
  activeKey={mode}
  onChange={setMode}
/>
```

**Features**:
- Black/40 rounded pill container
- Blue active slider with smooth spring animation
- White text on active, secondary text on inactive

---

### 5. Input
High-speed data entry field with precision controls.

```tsx
import { Input } from '@/shared/ui';

<Input
  label="AMOUNT"
  placeholder="0.00"
  value={amount}
  onChangeText={setAmount}
  showPercentButtons
  onPercentPress={(percent) => setAmount(calculateAmount(percent))}
  keyboardType="decimal-pad"
/>
```

**Features**:
- Height: 56px
- Dark inset background (black/20)
- Blue border on focus with glow
- Optional quick-percent buttons (25%, 50%, Max)
- Blue uppercase label (10px)
- Error state with red border

---

### 6. Dropdown
Selector with high-blur menu surface.

```tsx
import { Dropdown } from '@/shared/ui';

<Dropdown
  items={[
    { label: 'Market Order', value: 'market' },
    { label: 'Limit Order', value: 'limit' },
  ]}
  value={orderType}
  onSelect={(item) => setOrderType(item.value)}
  placeholder="Select order type..."
/>
```

**Features**:
- Menu surface: Surface-High (#141B2D) with high blur
- Item hover: White/5 background with blue left-accent line (3px)
- Selected: Blue/10 background
- Chevron rotates 180° on open
- Modal overlay with center positioning

---

### 7. BottomNav
Floating bottom navigation bar for mobile.

```tsx
import { BottomNav } from '@/shared/ui';

<BottomNav
  items={[
    { key: 'markets', label: 'Markets', icon: <Icon name="chart" /> },
    { key: 'trade', label: 'Trade', icon: <Icon name="trade" /> },
    { key: 'portfolio', label: 'Portfolio', icon: <Icon name="wallet" /> },
  ]}
  activeKey={currentScreen}
  onPress={handleNavigation}
/>
```

**Features**:
- Height: 84px (fixed)
- 32px top-only rounding (floating effect)
- Active: Blue glow with 4px circular dot indicator
- Inactive: Slate-500 color, reduced opacity
- Auto-handles iOS safe area

---

## 🎯 Design Tokens

All components use centralized design tokens from `src/shared/config/theme.ts`:

### Colors
```tsx
import { HarbourColors } from '@/shared/config';

HarbourColors.midnight      // #020408 - Base
HarbourColors.surface       // #0A1220 - Secondary
HarbourColors.surfaceHigh   // #141B2D - Tertiary
HarbourColors.blue          // #3B82F6 - Primary
HarbourColors.success       // #10B981 - Green
HarbourColors.danger        // #EF4444 - Red
HarbourColors.border        // rgba(255,255,255,0.05)
```

### Border Radius
```tsx
import { BorderRadius } from '@/shared/config';

BorderRadius.sm      // 12px - Controls
BorderRadius.md      // 16px - Widgets
BorderRadius.lg      // 24px - Containers
BorderRadius.full    // 9999px - Pills
```

### Spacing
```tsx
import { Spacing } from '@/shared/config';

Spacing.xs   // 4px
Spacing.sm   // 8px
Spacing.md   // 16px
Spacing.lg   // 24px
Spacing.xl   // 32px
```

### Heights
```tsx
import { Heights } from '@/shared/config';

Heights.input           // 56px
Heights.orderBookRow    // 28px
Heights.bottomNav       // 84px
Heights.chartMobile     // 300px
```

---

## 📱 Component Patterns

### Prediction Card (4:5 Ratio)
```tsx
<Card variant="surface" size="lg" style={{ width: 340, height: 425 }}>
  <Text style={styles.title}>Will ETH reach $5000?</Text>
  <View style={styles.binaryButtons}>
    <YesButton onPress={handleYes}>YES 67¢</YesButton>
    <NoButton onPress={handleNo}>NO 33¢</NoButton>
  </View>
</Card>
```

### Portfolio Widget with PnL Glow
```tsx
<CardWidget variant="surface-high" glow="green">
  <Text style={{ fontSize: 24, fontWeight: '800', color: '#10B981' }}>
    +$12,345.67
  </Text>
  <Text style={{ fontSize: 14, color: '#9CA3AF' }}>Total P&L</Text>
</CardWidget>
```

### Order Entry Form
```tsx
<Card variant="surface" size="lg">
  <Tabs
    items={[
      { key: 'market', label: 'Market' },
      { key: 'limit', label: 'Limit' },
    ]}
    activeKey={orderType}
    onChange={setOrderType}
  />

  <Input
    label="AMOUNT"
    value={amount}
    onChangeText={setAmount}
    showPercentButtons
    onPercentPress={handlePercentPress}
  />

  <Input
    label="PRICE"
    value={price}
    onChangeText={setPrice}
  />

  <PrimaryButton fullWidth onPress={handleSubmit}>
    PLACE ORDER
  </PrimaryButton>
</Card>
```

### Segmented Market Toggle
```tsx
<SegmentedControl
  items={[
    { key: 'predictions', label: 'Predictions' },
    { key: 'stocks', label: 'Stocks' },
    { key: 'crypto', label: 'Crypto' },
  ]}
  activeKey={marketType}
  onChange={setMarketType}
/>
```

---

## 🚀 Usage

All components are exported from the shared UI barrel:

```tsx
import {
  Card,
  Button,
  Tabs,
  Input,
  Dropdown,
  BottomNav,
} from '@/shared/ui';
```

---

## 📐 Mobile Specifications

**Screen Dimensions**:
- Prediction Cards: 340×425px (4:5)
- Large Movements: 3:1 horizontal
- Chart Container: 35% viewport height (~280-320px)
- Order Book: 45% viewport, 28px rows

**Touch Targets**:
- Minimum: 44×44px (iOS guidelines)
- Buttons: 48-56px height
- Bottom Nav Items: Auto-sized with safe spacing

**Typography**:
- Primary Font: Manrope (system fallback)
- Weights: 500 (Medium), 700 (Bold), 800 (ExtraBold)
- Letter Spacing: +0.05em (buttons), -0.02em (headers)

---

## 🎨 Visual Effects

**Glassmorphism**:
- Background: `rgba(10, 18, 32, 0.4)`
- Border: `rgba(255, 255, 255, 0.05)` @ 1px
- Backdrop blur: 16-24px (requires additional setup)

**Glows**:
- Green: `shadowOpacity: 0.15, shadowRadius: 20`
- Red: `shadowOpacity: 0.15, shadowRadius: 20`
- Blue: `shadowOpacity: 0.12, shadowRadius: 16`

**Interactions**:
- Scale: 0.98 on press
- Spring animation: `tension: 300, friction: 10-30`
- Opacity: 0.7 active opacity

---

## 📚 Related Docs

- `FSD_STRUCTURE.md` - Architecture overview
- `src/shared/ui/card/README.md` - Card component details
- `src/shared/config/theme.ts` - Design tokens source

---

## ✅ Component Checklist

- ✅ Card
- ✅ Button (Primary, Secondary, YES/NO)
- ✅ Tabs
- ✅ SegmentedControl
- ✅ Input (with percent buttons)
- ✅ Dropdown
- ✅ BottomNav (Mobile)
- ⏳ Badge (Coming soon)
- ⏳ Toast (Coming soon)
- ⏳ Modal (Coming soon)
- ⏳ Charts (Coming soon)

---

**Design System**: Harbour Midnight (Stealth Wealth)
**Target**: Mobile Pro-Retail Trading
**Status**: Production Ready ✅

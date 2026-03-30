/**
 * Harbour Midnight Design System
 * "Stealth Wealth" aesthetic for Pro-Retail fintech application
 */

import { Platform } from 'react-native';

/**
 * Core Color Palette: "Ink & Neon"
 */
export const HarbourColors = {
  // Base Layers
  midnight: '#020408',        // Deepest Ink/Midnight - Base background
  surface: '#0A1220',         // Secondary layer with slight blue-grey tint
  surfaceHigh: '#141B2D',     // Tertiary/Active layer

  // Primary Accents
  blue: '#3B82F6',            // Harbour Blue - Primary CTAs and active states

  // Semantic Colors
  success: '#10B981',         // Emerald Green - Gains, bids, "YES" buttons
  long: '#10B981',            // Alias for success
  danger: '#EF4444',          // Coral Red - Losses, asks, "NO" buttons
  short: '#EF4444',           // Alias for danger

  // Text Colors
  textPrimary: '#FFFFFF',     // Primary text
  textSecondary: '#9CA3AF',   // Secondary text
  textTertiary: '#6B7280',    // Tertiary text/labels

  // Borders & Strokes
  border: 'rgba(255, 255, 255, 0.05)',      // Ultra-subtle glassmorphic borders
  borderMedium: 'rgba(255, 255, 255, 0.08)', // Medium emphasis borders
  borderHigh: 'rgba(255, 255, 255, 0.12)',   // High emphasis borders

  // Glassmorphism
  glass: 'rgba(10, 18, 32, 0.4)',           // Standard glass background
  glassHigh: 'rgba(20, 27, 45, 0.6)',       // High emphasis glass
};

/**
 * Border Radius System
 */
export const BorderRadius = {
  lg: 24,      // Global container radius - Main containers, modals, primary cards
  md: 16,      // Widget/Module radius - Nested widgets, inner cards
  sm: 12,      // Control/Input radius - Input fields, small buttons
  full: 9999,  // Navigation/Pill radius - Navigation bars, status indicators
};

/**
 * Spacing System (8px base)
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Typography System
 * Primary: Manrope (Use system fallbacks until custom font loaded)
 */
export const Typography = {
  weights: {
    medium: '500',
    bold: '700',
    extraBold: '800',
  },
  letterSpacing: {
    tight: -0.02,  // Apply to headers for professional look
    normal: 0,
  },
};

/**
 * Component Heights
 */
export const Heights = {
  input: 56,           // Input fields
  orderBookRow: 28,    // Order book rows (extreme data density)
  bottomNav: 84,       // Bottom navigation bar
  chartMobile: 300,    // Default chart height (mobile)
};

/**
 * Shadow/Glow Effects
 */
export const Effects = {
  glowGreen: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  glowRed: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  glowBlue: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
};

/**
 * Legacy Colors (for backward compatibility)
 * @deprecated Use HarbourColors instead
 */
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#3B82F6',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#3B82F6',
  },
  dark: {
    text: HarbourColors.textPrimary,
    background: HarbourColors.midnight,
    tint: HarbourColors.blue,
    icon: HarbourColors.textSecondary,
    tabIconDefault: HarbourColors.textSecondary,
    tabIconSelected: HarbourColors.blue,
  },
};

/**
 * Font System
 */
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    manrope: 'system-ui', // Fallback to system until Manrope loaded
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    manrope: 'normal', // Fallback
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    manrope: "'Manrope', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

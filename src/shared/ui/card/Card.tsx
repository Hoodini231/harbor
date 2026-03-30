import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { HarbourColors, BorderRadius, Spacing } from '../../config/theme';

export type CardVariant = 'base' | 'surface' | 'surface-high' | 'glass';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends ViewProps {
  /**
   * Visual variant of the card
   * - base: Midnight background (#020408)
   * - surface: Secondary surface (#0A1220)
   * - surface-high: Tertiary/Active surface (#141B2D)
   * - glass: Glassmorphic effect
   */
  variant?: CardVariant;

  /**
   * Border radius size
   * - sm: 12px (Controls)
   * - md: 16px (Widgets/Modules)
   * - lg: 24px (Main containers)
   */
  size?: CardSize;

  /**
   * Apply border
   */
  bordered?: boolean;

  /**
   * Custom padding (defaults based on size)
   */
  padding?: number;

  /**
   * Apply glow effect
   */
  glow?: 'green' | 'red' | 'blue' | 'none';

  /**
   * Children components
   */
  children?: React.ReactNode;
}

/**
 * Card - Reusable widget container component
 * Implements Harbour Midnight design system with glassmorphic effects
 */
export function Card({
  variant = 'surface',
  size = 'md',
  bordered = true,
  padding,
  glow = 'none',
  style,
  children,
  ...props
}: CardProps) {
  const getBackgroundColor = (): string => {
    switch (variant) {
      case 'base':
        return HarbourColors.midnight;
      case 'surface':
        return HarbourColors.surface;
      case 'surface-high':
        return HarbourColors.surfaceHigh;
      case 'glass':
        return HarbourColors.glass;
      default:
        return HarbourColors.surface;
    }
  };

  const getBorderRadius = (): number => {
    switch (size) {
      case 'sm':
        return BorderRadius.sm;
      case 'md':
        return BorderRadius.md;
      case 'lg':
        return BorderRadius.lg;
      default:
        return BorderRadius.md;
    }
  };

  const getPadding = (): number => {
    if (padding !== undefined) return padding;

    switch (size) {
      case 'sm':
        return Spacing.md;
      case 'md':
        return Spacing.lg;
      case 'lg':
        return Spacing.xl;
      default:
        return Spacing.lg;
    }
  };

  const getGlowStyle = (): ViewStyle => {
    switch (glow) {
      case 'green':
        return {
          shadowColor: HarbourColors.success,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 8,
        };
      case 'red':
        return {
          shadowColor: HarbourColors.danger,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 8,
        };
      case 'blue':
        return {
          shadowColor: HarbourColors.blue,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 6,
        };
      default:
        return {};
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: getBorderRadius(),
    padding: getPadding(),
    ...(bordered && {
      borderWidth: 1,
      borderColor: HarbourColors.border,
    }),
    ...getGlowStyle(),
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
}

/**
 * Pre-configured Card variants for common use cases
 */

export const CardWidget = (props: Omit<CardProps, 'size'>) => (
  <Card size="md" {...props} />
);

export const CardContainer = (props: Omit<CardProps, 'size'>) => (
  <Card size="lg" {...props} />
);

export const CardControl = (props: Omit<CardProps, 'size'>) => (
  <Card size="sm" {...props} />
);

export const CardGlass = (props: Omit<CardProps, 'variant'>) => (
  <Card variant="glass" bordered {...props} />
);

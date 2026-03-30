import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Animated,
} from 'react-native';
import { HarbourColors, BorderRadius } from '../../config/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'yes' | 'no';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Button variant
   * - primary: Harbour Blue CTA (#3B82F6)
   * - secondary: Glassmorphic ghost button
   * - yes: Green binary button (#10B981)
   * - no: Red binary button (#EF4444)
   */
  variant?: ButtonVariant;

  /**
   * Button size
   */
  size?: ButtonSize;

  /**
   * Button label
   */
  children: string | React.ReactNode;

  /**
   * Full width button
   */
  fullWidth?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Custom text style
   */
  textStyle?: TextStyle;
}

/**
 * Button - Tactile, high-performance action component
 * Implements Harbour Midnight design system with physical feel
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: HarbourColors.blue,
            borderRadius: BorderRadius.full,
            shadowColor: HarbourColors.blue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: 0.7,
          },
        };

      case 'secondary':
        return {
          container: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: BorderRadius.sm,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          text: {
            color: '#FFFFFF',
            fontWeight: '700',
          },
        };

      case 'yes':
        return {
          container: {
            backgroundColor: HarbourColors.success,
            borderRadius: BorderRadius.md,
            shadowColor: HarbourColors.success,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 8,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: 0.7,
          },
        };

      case 'no':
        return {
          container: {
            backgroundColor: HarbourColors.danger,
            borderRadius: BorderRadius.md,
            shadowColor: HarbourColors.danger,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 8,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: 0.7,
          },
        };

      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: 10,
            paddingHorizontal: 16,
            minHeight: 40,
          },
          text: {
            fontSize: 12,
          },
        };

      case 'md':
        return {
          container: {
            paddingVertical: 14,
            paddingHorizontal: 24,
            minHeight: 48,
          },
          text: {
            fontSize: 14,
          },
        };

      case 'lg':
        return {
          container: {
            paddingVertical: 18,
            paddingHorizontal: 32,
            minHeight: 56,
          },
          text: {
            fontSize: 16,
          },
        };

      default:
        return {
          container: {},
          text: {},
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle: ViewStyle = {
    ...styles.base,
    ...variantStyles.container,
    ...sizeStyles.container,
    ...(fullWidth && { width: '100%' }),
    ...(disabled && styles.disabled),
  };

  const finalTextStyle: TextStyle = {
    ...styles.text,
    ...variantStyles.text,
    ...sizeStyles.text,
    ...(disabled && styles.disabledText),
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[containerStyle, style]}
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...props}
      >
        {typeof children === 'string' ? (
          <Text style={[finalTextStyle, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});

/**
 * Pre-configured button variants
 */

export const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...props} />
);

export const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...props} />
);

export const YesButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="yes" {...props} />
);

export const NoButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="no" {...props} />
);

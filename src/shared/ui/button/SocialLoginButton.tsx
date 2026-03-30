import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { HarbourColors, BorderRadius } from '../../config/theme';

export type SocialProvider = 'google' | 'apple';

export interface SocialLoginButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Social provider
   */
  provider: SocialProvider;

  /**
   * Button label
   */
  children?: string;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * SocialLoginButton - OAuth authentication button
 * Dark glassmorphic style with provider icons
 */
export function SocialLoginButton({
  provider,
  children,
  style,
  ...props
}: SocialLoginButtonProps) {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: 'G',
          label: children || 'GOOGLE',
          color: '#EA4335',
        };
      case 'apple':
        return {
          icon: '',
          label: children || 'APPLE',
          color: '#FFFFFF',
        };
      default:
        return {
          icon: '?',
          label: children || 'LOGIN',
          color: '#FFFFFF',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.content}>
        <Text style={[styles.icon, { color: config.color }]}>{config.icon}</Text>
        <Text style={styles.label}>{config.label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    letterSpacing: 0.5,
  },
});

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { HarbourColors, BorderRadius, Heights } from '../../config/theme';

export interface TextFieldProps extends TextInputProps {
  /**
   * Field label (appears above input in uppercase)
   */
  label: string;

  /**
   * Show "FORGOT?" link next to label
   */
  showForgotLink?: boolean;

  /**
   * Callback when "FORGOT?" is pressed
   */
  onForgotPress?: () => void;

  /**
   * Error message
   */
  error?: string;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Custom input style
   */
  inputStyle?: TextStyle;
}

/**
 * TextField - Login form input field
 * Uppercase label with optional "FORGOT?" link, dark inset background
 */
export function TextField({
  label,
  showForgotLink = false,
  onForgotPress,
  error,
  containerStyle,
  inputStyle,
  value,
  onChangeText,
  secureTextEntry,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label Row */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {showForgotLink && (
          <TouchableOpacity onPress={onForgotPress} activeOpacity={0.7}>
            <Text style={styles.forgotLink}>FORGOT?</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor="rgba(156, 163, 175, 0.4)"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  forgotLink: {
    fontSize: 11,
    fontWeight: '700',
    color: HarbourColors.blue,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderColor: 'rgba(59, 130, 246, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainerError: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
    paddingVertical: 0,
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
    color: HarbourColors.danger,
    marginTop: 8,
    marginLeft: 12,
  },
});

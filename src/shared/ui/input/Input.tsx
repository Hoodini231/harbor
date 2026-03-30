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

export interface InputProps extends TextInputProps {
  /**
   * Input label (appears above field)
   */
  label?: string;

  /**
   * Show quick percent buttons (25%, 50%, Max)
   */
  showPercentButtons?: boolean;

  /**
   * Callback when percent button is pressed
   * Returns the percentage value (0.25, 0.5, 1.0)
   */
  onPercentPress?: (percent: number) => void;

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
 * Input - High-speed data entry field with precision
 * Height: 56px, Dark inset background, Blue active border
 */
export function Input({
  label,
  showPercentButtons = false,
  onPercentPress,
  error,
  containerStyle,
  inputStyle,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handlePercentPress = (percent: number) => {
    onPercentPress?.(percent);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={HarbourColors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {showPercentButtons && (
          <View style={styles.percentButtons}>
            <TouchableOpacity
              style={styles.percentButton}
              onPress={() => handlePercentPress(0.25)}
              activeOpacity={0.7}
            >
              <Text style={styles.percentButtonText}>25%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.percentButton}
              onPress={() => handlePercentPress(0.5)}
              activeOpacity={0.7}
            >
              <Text style={styles.percentButtonText}>50%</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.percentButton}
              onPress={() => handlePercentPress(1.0)}
              activeOpacity={0.7}
            >
              <Text style={styles.percentButtonText}>Max</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: HarbourColors.blue,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Heights.input,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: 'rgba(59, 130, 246, 0.5)',
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  inputContainerError: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
    paddingVertical: 0,
  },
  percentButtons: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 12,
  },
  percentButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  percentButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: HarbourColors.blue,
    textTransform: 'uppercase',
  },
  error: {
    fontSize: 12,
    fontWeight: '500',
    color: HarbourColors.danger,
    marginTop: 6,
    marginLeft: 4,
  },
});

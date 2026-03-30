import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
import { HarbourColors, BorderRadius, Spacing } from '../../config/theme';

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownProps {
  /**
   * Dropdown items
   */
  items: DropdownItem[];

  /**
   * Selected value
   */
  value?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Callback when item is selected
   */
  onSelect?: (item: DropdownItem) => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * Dropdown - Selector with high-blur menu surface
 * Menu: Surface-High (#141B2D), Hover: Blue left-accent line
 */
export function Dropdown({
  items,
  value,
  placeholder = 'Select...',
  onSelect,
  style,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));

  const selectedItem = items.find((item) => item.value === value);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    setIsOpen(false);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleSelect = (item: DropdownItem) => {
    onSelect?.(item);
    handleClose();
  };

  const chevronRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.trigger, disabled && styles.triggerDisabled]}
        onPress={handleOpen}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[styles.triggerText, !selectedItem && styles.placeholder]}>
          {selectedItem?.label || placeholder}
        </Text>

        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <View style={styles.chevron} />
        </Animated.View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClose}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {items.map((item, index) => (
                  <DropdownMenuItem
                    key={item.value}
                    item={item}
                    isSelected={item.value === value}
                    onPress={() => handleSelect(item)}
                    isLast={index === items.length - 1}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

interface DropdownMenuItemProps {
  item: DropdownItem;
  isSelected: boolean;
  onPress: () => void;
  isLast: boolean;
}

function DropdownMenuItem({ item, isSelected, onPress, isLast }: DropdownMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isHovered && styles.menuItemHover,
        isSelected && styles.menuItemSelected,
        !isLast && styles.menuItemBorder,
      ]}
      onPress={onPress}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      activeOpacity={1}
    >
      {isHovered && <View style={styles.accentLine} />}
      <Text style={[styles.menuItemText, isSelected && styles.menuItemTextSelected]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
  },
  placeholder: {
    color: HarbourColors.textTertiary,
  },
  chevron: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: HarbourColors.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: '90%',
    maxHeight: '70%',
  },
  menu: {
    backgroundColor: HarbourColors.surfaceHigh,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: HarbourColors.borderMedium,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  scrollView: {
    maxHeight: 400,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  menuItemSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: HarbourColors.blue,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
  },
  menuItemTextSelected: {
    color: HarbourColors.blue,
    fontWeight: '600',
  },
});

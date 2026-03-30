import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { HarbourColors, Heights } from '../../config/theme';

export interface BottomNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface BottomNavProps {
  /**
   * Navigation items
   */
  items: BottomNavItem[];

  /**
   * Currently active item key
   */
  activeKey?: string;

  /**
   * Callback when navigation item is pressed
   */
  onPress?: (key: string) => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * BottomNav - Floating bottom navigation bar for mobile
 * Height: 84px, 32px top-only rounding, Active: Blue glow with dot indicator
 */
export function BottomNav({ items, activeKey, onPress, style }: BottomNavProps) {
  const handlePress = (key: string) => {
    onPress?.(key);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {items.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => handlePress(item.key)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {item.icon}
                {isActive && <View style={styles.dotIndicator} />}
                {isActive && <View style={styles.glow} />}
              </View>

              <Text style={[styles.label, isActive && styles.labelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Heights.bottomNav,
    backgroundColor: HarbourColors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: HarbourColors.borderMedium,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    ...Platform.select({
      ios: {
        paddingBottom: 20, // Account for iOS safe area
      },
      android: {
        paddingBottom: 8,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingHorizontal: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  dotIndicator: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: HarbourColors.blue,
  },
  glow: {
    position: 'absolute',
    top: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: HarbourColors.blue,
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
  },
  labelActive: {
    color: HarbourColors.blue,
    fontWeight: '700',
  },
});

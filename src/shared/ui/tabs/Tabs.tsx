import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { HarbourColors, Spacing } from '../../config/theme';

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  /**
   * Array of tab items
   */
  items: TabItem[];

  /**
   * Currently active tab key
   */
  activeKey?: string;

  /**
   * Callback when tab changes
   */
  onChange?: (key: string) => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * Tabs - Main tab bar for switching contexts
 * Surface: #0A1220, Active: Blue glow with bottom indicator
 */
export function Tabs({ items, activeKey, onChange, style }: TabsProps) {
  const [active, setActive] = useState(activeKey || items[0]?.key);

  const handlePress = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <View style={[styles.container, style]}>
      {items.map((item) => {
        const isActive = item.key === active;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.tab}
            onPress={() => handlePress(item.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.indicator} />}
            {isActive && <View style={styles.glow} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: HarbourColors.surface,
    borderBottomWidth: 1,
    borderBottomColor: HarbourColors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: HarbourColors.blue,
  },
  glow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: HarbourColors.blue,
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
});

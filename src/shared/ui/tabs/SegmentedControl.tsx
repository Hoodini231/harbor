import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import { HarbourColors, BorderRadius } from '../../config/theme';

export interface SegmentItem {
  key: string;
  label: string;
}

export interface SegmentedControlProps {
  /**
   * Array of segment items
   */
  items: SegmentItem[];

  /**
   * Currently active segment key
   */
  activeKey?: string;

  /**
   * Callback when segment changes
   */
  onChange?: (key: string) => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

/**
 * SegmentedControl - Pill toggle with smooth animated slider
 * Container: Black/40 rounded pill, Active: Blue background
 */
export function SegmentedControl({
  items,
  activeKey,
  onChange,
  style,
}: SegmentedControlProps) {
  const [active, setActive] = useState(activeKey || items[0]?.key);
  const [layouts, setLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});
  const slideAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;

  const handleLayout = (key: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setLayouts((prev) => ({ ...prev, [key]: { x, width } }));
  };

  useEffect(() => {
    const activeLayout = layouts[active];
    if (activeLayout) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: activeLayout.x,
          useNativeDriver: true,
          tension: 300,
          friction: 30,
        }),
        Animated.spring(widthAnim, {
          toValue: activeLayout.width,
          useNativeDriver: false,
          tension: 300,
          friction: 30,
        }),
      ]).start();
    }
  }, [active, layouts]);

  const handlePress = (key: string) => {
    setActive(key);
    onChange?.(key);
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: slideAnim }],
            width: widthAnim,
          },
        ]}
      />
      {items.map((item) => {
        const isActive = item.key === active;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.segment}
            onPress={() => handlePress(item.key)}
            onLayout={(event) => handleLayout(item.key, event)}
            activeOpacity={0.7}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: BorderRadius.full,
    padding: 4,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    top: 4,
    left: 4,
    bottom: 4,
    backgroundColor: HarbourColors.blue,
    borderRadius: BorderRadius.full,
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: HarbourColors.textSecondary,
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

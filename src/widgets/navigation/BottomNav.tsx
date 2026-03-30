import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HarbourColors } from '../../shared/config/theme';

export type BottomNavTab = 'home' | 'portfolio' | 'news' | 'watchlist' | 'markets';

export interface BottomNavProps {
  activeTab: BottomNavTab;
  onTabPress: (tab: BottomNavTab) => void;
}

/**
 * BottomNav - Main navigation bar
 * 5 tabs: HOME, PORTFOLIO, NEWS, WATCHLIST, MARKETS
 */
export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const tabs: Array<{ id: BottomNavTab; label: string; icon: string }> = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'portfolio', label: 'PORTFOLIO', icon: '💼' },
    { id: 'news', label: 'NEWS', icon: '📰' },
    { id: 'watchlist', label: 'WATCHLIST', icon: '⭐' },
    { id: 'markets', label: 'MARKETS', icon: '📈' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 25, 41, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.2)',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 0.6)',
    letterSpacing: 0.5,
  },
  labelActive: {
    color: HarbourColors.blue,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 2,
    backgroundColor: HarbourColors.blue,
    borderRadius: 2,
  },
});

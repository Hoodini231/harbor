import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { HarbourColors, BorderRadius } from '../../config/theme';

export interface SearchBarProps {
  /**
   * Search query value
   */
  value?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Callback when search text changes
   */
  onChangeText?: (text: string) => void;

  /**
   * Trending tags to display below search
   */
  trendingTags?: string[];

  /**
   * Callback when trending tag is pressed
   */
  onTagPress?: (tag: string) => void;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;
}

/**
 * SearchBar - Discovery search with trending tags
 * Features search input and horizontal scrolling trending tags
 */
export function SearchBar({
  value,
  placeholder = 'Search markets, assets, crypto...',
  onChangeText,
  trendingTags = [],
  onTagPress,
  containerStyle,
}: SearchBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(156, 163, 175, 0.5)"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* Trending Tags */}
      {trendingTags.length > 0 && (
        <View style={styles.trendingSection}>
          <Text style={styles.trendingLabel}>TRENDING:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagsContainer}
          >
            {trendingTags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => onTagPress?.(tag)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: HarbourColors.textPrimary,
    paddingVertical: 0,
  },
  trendingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  trendingLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(156, 163, 175, 0.7)',
    letterSpacing: 0.8,
    marginRight: 12,
  },
  tagsContainer: {
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: HarbourColors.textPrimary,
  },
});

/**
 * Card Component Usage Examples
 * Demonstrates the Harbour Midnight design system Card component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardWidget, CardContainer, CardControl, CardGlass } from './Card';
import { HarbourColors, Spacing } from '../../config/theme';

export function CardExamples() {
  return (
    <View style={styles.container}>
      {/* Base Surface Card */}
      <Card variant="surface" size="md">
        <Text style={styles.title}>Surface Card (Default)</Text>
        <Text style={styles.subtitle}>16px radius • #0A1220 background</Text>
      </Card>

      {/* Surface High Card */}
      <Card variant="surface-high" size="md">
        <Text style={styles.title}>Surface High Card</Text>
        <Text style={styles.subtitle}>Active/tertiary layer • #141B2D</Text>
      </Card>

      {/* Large Container Card */}
      <CardContainer variant="base">
        <Text style={styles.title}>Container Card</Text>
        <Text style={styles.subtitle}>24px radius • Main container style</Text>
      </CardContainer>

      {/* Glassmorphic Card */}
      <CardGlass size="md">
        <Text style={styles.title}>Glass Card</Text>
        <Text style={styles.subtitle}>Glassmorphic effect • Semi-transparent</Text>
      </CardGlass>

      {/* Widget Card with Green Glow */}
      <CardWidget variant="surface-high" glow="green">
        <Text style={[styles.title, { color: HarbourColors.success }]}>
          +$1,234.56
        </Text>
        <Text style={styles.subtitle}>PnL Card with Green Glow</Text>
      </CardWidget>

      {/* Widget Card with Red Glow */}
      <CardWidget variant="surface-high" glow="red">
        <Text style={[styles.title, { color: HarbourColors.danger }]}>
          -$567.89
        </Text>
        <Text style={styles.subtitle}>PnL Card with Red Glow</Text>
      </CardWidget>

      {/* Small Control Card */}
      <CardControl variant="surface" bordered={false}>
        <Text style={styles.subtitle}>Small Control Card</Text>
      </CardControl>

      {/* Custom Padding Card */}
      <Card variant="surface" size="md" padding={32}>
        <Text style={styles.title}>Custom Padding</Text>
        <Text style={styles.subtitle}>32px padding override</Text>
      </Card>

      {/* No Border Card */}
      <Card variant="surface-high" size="lg" bordered={false}>
        <Text style={styles.title}>Borderless Card</Text>
        <Text style={styles.subtitle}>No glassmorphic border</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
  },
});

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HarbourColors, Spacing } from '@/src/shared/config/theme';

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>News</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
  },
});

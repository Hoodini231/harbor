import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { HarbourColors } from '../../shared/config/theme';

const { width } = Dimensions.get('window');

export function SplashPage() {
  const [loadingState, setLoadingState] = useState<'synchronizing' | 'connecting'>('synchronizing');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dotOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulsing dot animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(dotOpacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation (5 seconds total)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    // Change loading state halfway
    const stateTimeout = setTimeout(() => {
      setLoadingState('connecting');
    }, 2500);

    // Navigate to login after 5 seconds
    const navTimeout = setTimeout(() => {
      router.replace('/login');
    }, 5000);

    return () => {
      clearTimeout(stateTimeout);
      clearTimeout(navTimeout);
    };
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F', '#0B3D40']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Anchor Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.anchorIcon}>⚓</Text>
          </View>
        </View>

        {/* Brand Name with Gradient Effect */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>
            <Text style={styles.brandNameWhite}>Har</Text>
            <Text style={styles.brandNameBlue}>bour</Text>
          </Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>NAVIGATING CAPITAL</Text>
      </Animated.View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View style={styles.progressBarBackground}>
            <LinearGradient
              colors={['#3B82F6', '#10B981', '#06B6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: progressWidth }]}
            />
          </Animated.View>
        </View>

        {/* Loading States */}
        <View style={styles.loadingStates}>
          <View style={styles.stateItem}>
            <Animated.View style={[styles.stateDot, { opacity: dotOpacity }]} />
            <Text style={styles.stateText}>SYNCHRONIZING LEDGERS</Text>
          </View>

          <View style={styles.stateItem}>
            <View style={styles.stateDotInactive} />
            <Text style={styles.stateTextInactive}>TIER I CONNECTIVITY</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          POWERED BY <Text style={styles.footerBold}>HYPERLIQUID</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1929',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },
  anchorIcon: {
    fontSize: 80,
    color: '#A5D4FF',
  },
  brandContainer: {
    marginBottom: 16,
  },
  brandName: {
    fontSize: 72,
    fontWeight: '800',
    letterSpacing: -2,
  },
  brandNameWhite: {
    color: '#FFFFFF',
  },
  brandNameBlue: {
    color: '#A5D4FF',
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  progressBarContainer: {
    marginBottom: 32,
  },
  progressBarBackground: {
    height: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  loadingStates: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    marginBottom: 32,
  },
  stateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  stateDotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
  },
  stateText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  stateTextInactive: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 0.5)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  footer: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    letterSpacing: 1,
  },
  footerBold: {
    fontWeight: '800',
    color: '#9CA3AF',
  },
});

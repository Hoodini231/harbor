import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Card } from '../../shared/ui/card';
import { PrimaryButton } from '../../shared/ui/button';
import { SocialLoginButton } from '../../shared/ui/button';
import { TextField } from '../../shared/ui/input';
import { HarbourColors, Spacing } from '../../shared/config/theme';
import { login, loginWithGoogle, loginWithApple, forgotPassword } from '../../features/auth';

/**
 * LoginPage - High-performance trading suite authentication
 * Features email/password login and OAuth (Google, Apple)
 */
export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({ email, password });
      if (response.success) {
        // Navigate to main app
        router.replace('/(tabs)' as any);
      } else {
        Alert.alert('Login Failed', response.error || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await loginWithGoogle();
      if (response.success) {
        router.replace('/(tabs)' as any);
      }
    } catch (error) {
      Alert.alert('Error', 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await loginWithApple();
      if (response.success) {
        router.replace('/(tabs)' as any);
      }
    } catch (error) {
      Alert.alert('Error', 'Apple login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Enter Email', 'Please enter your email address first');
      return;
    }

    try {
      const response = await forgotPassword(email);
      Alert.alert('Success', response.message);
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link');
    }
  };

  const handleRequestAccess = () => {
    Alert.alert('Request Access', 'Access request feature coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F', '#0B3D40']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.anchorIcon}>⚓</Text>
          <Text style={styles.brandName}>
            <Text style={styles.brandNameWhite}>HAR</Text>
            <Text style={styles.brandNameBlue}>BOUR</Text>
          </Text>
        </View>

        {/* Login Card */}
        <Card variant="surface" size="lg" style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Access your high-performance trading suite
          </Text>

          {/* Email Field */}
          <TextField
            label="EMAIL ADDRESS"
            placeholder="name@firm.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
          />

          {/* Password Field */}
          <TextField
            label="PASSWORD"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showForgotLink
            onForgotPress={handleForgotPassword}
            editable={!isLoading}
            containerStyle={styles.passwordField}
          />

          {/* Login Button */}
          <PrimaryButton
            fullWidth
            size="lg"
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          >
            {isLoading ? 'LOADING...' : 'Login to Terminal'}
          </PrimaryButton>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>SECURE SOCIAL ACCESS</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialButtons}>
            <SocialLoginButton
              provider="google"
              onPress={handleGoogleLogin}
              disabled={isLoading}
            />
            <SocialLoginButton
              provider="apple"
              onPress={handleAppleLogin}
              disabled={isLoading}
            />
          </View>

          {/* Request Access */}
          <View style={styles.requestAccessContainer}>
            <Text style={styles.requestAccessText}>New to Harbour? </Text>
            <TouchableOpacity onPress={handleRequestAccess} activeOpacity={0.7}>
              <Text style={styles.requestAccessLink}>Request Access</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.securityBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>🛡</Text>
              <Text style={styles.badgeText}>AES-256 ENCRYPTED</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeIcon}>✓</Text>
              <Text style={styles.badgeText}>ULTRA-LOW LATENCY</Text>
            </View>
          </View>

          <Text style={styles.copyright}>
            © 2024 HARBOUR TECHNOLOGIES LTD. ALL RIGHTS RESERVED
          </Text>
          <View style={styles.legalLinks}>
            <Text style={styles.legalLink}>PRIVACY POLICY</Text>
            <Text style={styles.legalDivider}>•</Text>
            <Text style={styles.legalLink}>TERMS OF SERVICE</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  anchorIcon: {
    fontSize: 40,
    color: '#A5D4FF',
    marginBottom: 8,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 2,
  },
  brandNameWhite: {
    color: '#FFFFFF',
  },
  brandNameBlue: {
    color: '#A5D4FF',
  },
  card: {
    padding: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  passwordField: {
    marginTop: 24,
  },
  loginButton: {
    marginTop: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 0.6)',
    letterSpacing: 1,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  requestAccessContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  requestAccessText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(156, 163, 175, 0.8)',
  },
  requestAccessLink: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
    paddingBottom: 32,
  },
  securityBadges: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(156, 163, 175, 0.6)',
    letterSpacing: 0.5,
  },
  copyright: {
    fontSize: 9,
    fontWeight: '500',
    color: 'rgba(107, 114, 128, 0.8)',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  legalLinks: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  legalLink: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(107, 114, 128, 0.8)',
    letterSpacing: 0.5,
  },
  legalDivider: {
    fontSize: 9,
    color: 'rgba(107, 114, 128, 0.5)',
  },
});

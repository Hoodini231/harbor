import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from '../../shared/ui/input';
import { Card } from '../../shared/ui/card';
import { HarbourColors, Spacing, BorderRadius } from '../../shared/config/theme';

type CategoryTab = 'all' | 'predictions' | 'crypto';

/**
 * HomePage - Discovery page with search and market overview
 * Mock-up version with placeholder widgets
 */
export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('all');

  const trendingTags = ['#Election2024', '$ETH Merge', 'NVIDIA Earnings', 'Fed Rate Cut'];

  const categories: Array<{ id: CategoryTab; label: string }> = [
    { id: 'all', label: 'All Assets' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'crypto', label: 'Crypto' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A1929', '#0D2137', '#0F2B3F']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>
              <Text style={styles.brandNameWhite}>HARBOUR </Text>
              <Text style={styles.brandNameBlue}>Discovery</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search markets, assets, crypto..."
          trendingTags={trendingTags}
          onTagPress={(tag) => console.log('Tag pressed:', tag)}
          containerStyle={styles.searchBar}
        />

        {/* Category Tabs */}
        <View style={styles.categories}>
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryTab, isActive && styles.categoryTabActive]}
                onPress={() => setActiveCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Featured Collections - Placeholder */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Collections</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAll}>View All &gt;</Text>
            </TouchableOpacity>
          </View>

          <Card variant="glass" size="lg" style={styles.featuredCard}>
            <View style={styles.featuredBadge}>
              <Text style={styles.badgeText}>HIGH YIELD</Text>
            </View>
            <Text style={styles.featuredTitle}>Aggressive Growth Predictions</Text>
            <Text style={styles.featuredSubtitle}>12 Active Markets</Text>
            <View style={styles.featuredStats}>
              <Text style={styles.statValue}>+24.5% Avg</Text>
            </View>
          </Card>
        </View>

        {/* Prediction Markets - Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prediction Markets</Text>

          <Card variant="glass" size="md" style={styles.marketCard}>
            <Text style={styles.marketQuestion}>
              Will AWS experience a global outage before Q3 end?
            </Text>
            <Text style={styles.marketCategory}>TECH · Ends Sep 30, 2024</Text>

            <View style={styles.priceRow}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>YES</Text>
                <Text style={styles.priceValueYes}>$0.12</Text>
              </View>
              <View style={[styles.priceBox, styles.priceBoxNo]}>
                <Text style={styles.priceLabel}>NO</Text>
                <Text style={styles.priceValueNo}>$0.88</Text>
              </View>
            </View>

            <View style={styles.marketMeta}>
              <Text style={styles.metaText}>💧 $2.4M Volume</Text>
              <Text style={styles.liveNow}>● Live Now</Text>
            </View>
          </Card>

          <Card variant="glass" size="md" style={styles.marketCard}>
            <Text style={styles.marketQuestion}>
              SEC to approve Spot Ethereum ETF by July?
            </Text>
            <Text style={styles.marketCategory}>FINANCE · Ends July 31, 2024</Text>

            <View style={styles.priceRow}>
              <View style={styles.priceBox}>
                <Text style={styles.priceLabel}>YES</Text>
                <Text style={styles.priceValueYes}>$0.64</Text>
              </View>
              <View style={[styles.priceBox, styles.priceBoxNo]}>
                <Text style={styles.priceLabel}>NO</Text>
                <Text style={styles.priceValueNo}>$0.36</Text>
              </View>
            </View>

            <View style={styles.marketMeta}>
              <Text style={styles.metaText}>💧 $18.1M Volume</Text>
              <Text style={styles.activeStatus}>● Active</Text>
            </View>
          </Card>
        </View>

        {/* Market Pulse - Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Pulse</Text>

          <Card variant="glass" size="sm">
            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <Text style={styles.assetIcon}>₿</Text>
                <View>
                  <Text style={styles.assetName}>Bitcoin</Text>
                  <Text style={styles.assetTicker}>BTC</Text>
                </View>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>$84,281.40</Text>
                <Text style={styles.assetChange}>+3.24%</Text>
              </View>
            </View>
          </Card>

          <Card variant="glass" size="sm">
            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <Text style={styles.assetIcon}>📈</Text>
                <View>
                  <Text style={styles.assetName}>NVIDIA Corp.</Text>
                  <Text style={styles.assetTicker}>NVDA</Text>
                </View>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>$834.12</Text>
                <Text style={styles.assetChange}>+1.82%</Text>
              </View>
            </View>
          </Card>

          <Card variant="glass" size="sm">
            <View style={styles.assetRow}>
              <View style={styles.assetLeft}>
                <Text style={styles.assetIcon}>🥇</Text>
                <View>
                  <Text style={styles.assetName}>Gold Ounce</Text>
                  <Text style={styles.assetTicker}>XAU</Text>
                </View>
              </View>
              <View style={styles.assetRight}>
                <Text style={styles.assetPrice}>$2,352.45</Text>
                <Text style={styles.assetChangeNegative}>-0.12%</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom padding for nav */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandNameWhite: {
    color: '#FFFFFF',
  },
  brandNameBlue: {
    color: HarbourColors.blue,
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  searchBar: {
    paddingHorizontal: Spacing.lg,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.lg,
    marginTop: 24,
  },
  categoryTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryTabActive: {
    backgroundColor: HarbourColors.blue,
    borderColor: HarbourColors.blue,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: HarbourColors.blue,
  },
  featuredCard: {
    padding: 20,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: BorderRadius.full,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
    marginBottom: 16,
  },
  featuredStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: HarbourColors.success,
  },
  marketCard: {
    padding: 16,
    marginBottom: 12,
  },
  marketQuestion: {
    fontSize: 15,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
  },
  marketCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.textTertiary,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  priceBox: {
    flex: 1,
    padding: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  priceBoxNo: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: HarbourColors.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  priceValueYes: {
    fontSize: 20,
    fontWeight: '800',
    color: HarbourColors.success,
  },
  priceValueNo: {
    fontSize: 20,
    fontWeight: '800',
    color: HarbourColors.danger,
  },
  marketMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
    color: HarbourColors.textTertiary,
  },
  liveNow: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.success,
  },
  activeStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.blue,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    fontSize: 24,
  },
  assetName: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
  },
  assetTicker: {
    fontSize: 12,
    fontWeight: '500',
    color: HarbourColors.textTertiary,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    marginBottom: 2,
  },
  assetChange: {
    fontSize: 12,
    fontWeight: '600',
    color: HarbourColors.success,
  },
  assetChangeNegative: {
    fontSize: 12,
    fontWeight: '600',
    color: HarbourColors.danger,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: HarbourColors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: HarbourColors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});

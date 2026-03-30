/**
 * Component Showcase
 * Demonstrates all Harbour Midnight UI components
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { HarbourColors, Spacing, BorderRadius } from '../config/theme';

// Import all components
import { Card, CardWidget, CardContainer } from './card';
import { Button, PrimaryButton, SecondaryButton, YesButton, NoButton } from './button';
import { Tabs, SegmentedControl } from './tabs';
import { Input } from './input';
import { Dropdown } from './dropdown';
import { BottomNav } from './navigation';

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [segmentValue, setSegmentValue] = useState('buy');
  const [amount, setAmount] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [activeNav, setActiveNav] = useState('markets');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Harbour Components</Text>
          <Text style={styles.headerSubtitle}>Midnight Design System</Text>
        </View>

        {/* Buttons Section */}
        <Section title="Buttons">
          <View style={styles.buttonRow}>
            <PrimaryButton size="md" onPress={() => console.log('Primary')}>
              PRIMARY CTA
            </PrimaryButton>
          </View>

          <View style={styles.buttonRow}>
            <SecondaryButton size="md" onPress={() => console.log('Secondary')}>
              Secondary
            </SecondaryButton>
          </View>

          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <YesButton size="lg" fullWidth onPress={() => console.log('Yes')}>
                YES 67¢
              </YesButton>
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <NoButton size="lg" fullWidth onPress={() => console.log('No')}>
                NO 33¢
              </NoButton>
            </View>
          </View>
        </Section>

        {/* Tabs Section */}
        <Section title="Tabs">
          <Tabs
            items={[
              { key: 'portfolio', label: 'Portfolio' },
              { key: 'balances', label: 'Balances' },
              { key: 'activity', label: 'Activity' },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
        </Section>

        {/* Segmented Control Section */}
        <Section title="Segmented Control">
          <SegmentedControl
            items={[
              { key: 'buy', label: 'Buy' },
              { key: 'sell', label: 'Sell' },
            ]}
            activeKey={segmentValue}
            onChange={setSegmentValue}
          />
        </Section>

        {/* Cards Section */}
        <Section title="Cards">
          <Card variant="surface" size="md" style={{ marginBottom: 12 }}>
            <Text style={styles.cardTitle}>Surface Card</Text>
            <Text style={styles.cardText}>Default widget container</Text>
          </Card>

          <CardWidget variant="surface-high" glow="green" style={{ marginBottom: 12 }}>
            <Text style={[styles.cardTitle, { color: HarbourColors.success }]}>
              +$12,345.67
            </Text>
            <Text style={styles.cardText}>Portfolio P&L with Green Glow</Text>
          </CardWidget>

          <CardWidget variant="surface-high" glow="red">
            <Text style={[styles.cardTitle, { color: HarbourColors.danger }]}>
              -$1,234.56
            </Text>
            <Text style={styles.cardText}>Loss with Red Glow</Text>
          </CardWidget>
        </Section>

        {/* Inputs Section */}
        <Section title="Inputs">
          <Input
            label="AMOUNT"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            style={{ marginBottom: 12 }}
          />

          <Input
            label="TRADE AMOUNT"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            showPercentButtons
            onPercentPress={(percent) => {
              console.log(`${percent * 100}% pressed`);
              setAmount((1000 * percent).toFixed(2));
            }}
            keyboardType="decimal-pad"
          />
        </Section>

        {/* Dropdown Section */}
        <Section title="Dropdown">
          <Dropdown
            items={[
              { label: 'Market Order', value: 'market' },
              { label: 'Limit Order', value: 'limit' },
              { label: 'Stop Loss', value: 'stop' },
              { label: 'Take Profit', value: 'profit' },
            ]}
            value={orderType}
            onSelect={(item) => setOrderType(item.value)}
            placeholder="Select order type..."
          />
        </Section>

        {/* Prediction Card Example */}
        <Section title="Prediction Card (4:5 Ratio)">
          <Card
            variant="surface"
            size="lg"
            style={{
              width: '100%',
              aspectRatio: 4 / 5,
              maxWidth: 340,
              alignSelf: 'center',
            }}
          >
            <Text style={styles.predictionTitle}>Will ETH reach $5,000 by Q4?</Text>
            <View style={styles.predictionStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Volume</Text>
                <Text style={styles.statValue}>$2.4M</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Liquidity</Text>
                <Text style={styles.statValue}>$840K</Text>
              </View>
            </View>

            <View style={styles.predictionButtons}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <YesButton fullWidth onPress={() => console.log('YES')}>
                  YES 67¢
                </YesButton>
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <NoButton fullWidth onPress={() => console.log('NO')}>
                  NO 33¢
                </NoButton>
              </View>
            </View>
          </Card>
        </Section>

        {/* Spacer for bottom nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        items={[
          { key: 'markets', label: 'Markets' },
          { key: 'trade', label: 'Trade' },
          { key: 'portfolio', label: 'Portfolio' },
          { key: 'settings', label: 'Settings' },
        ]}
        activeKey={activeNav}
        onPress={setActiveNav}
      />
    </SafeAreaView>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
  container: {
    flex: 1,
    backgroundColor: HarbourColors.midnight,
  },
  content: {
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: HarbourColors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: HarbourColors.blue,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: HarbourColors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    marginBottom: Spacing.md,
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: HarbourColors.textSecondary,
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  predictionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: HarbourColors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: HarbourColors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: HarbourColors.textPrimary,
  },
  predictionButtons: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
});

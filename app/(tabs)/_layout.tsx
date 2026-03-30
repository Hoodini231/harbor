import { Tabs, useRouter, usePathname } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNav, type BottomNavTab } from '@/src/widgets';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab from pathname
  const getActiveTab = (): BottomNavTab => {
    if (pathname.includes('/portfolio')) return 'portfolio';
    if (pathname.includes('/news')) return 'news';
    if (pathname.includes('/watchlist')) return 'watchlist';
    if (pathname.includes('/markets')) return 'markets';
    return 'home';
  };

  const handleTabPress = (tab: BottomNavTab) => {
    const routes: Record<BottomNavTab, string> = {
      home: '/(tabs)',
      portfolio: '/(tabs)/portfolio',
      news: '/(tabs)/news',
      watchlist: '/(tabs)/watchlist',
      markets: '/(tabs)/markets',
    };
    router.push(routes[tab] as any);
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide default tab bar
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="portfolio" />
        <Tabs.Screen name="news" />
        <Tabs.Screen name="watchlist" />
        <Tabs.Screen name="markets" />
      </Tabs>

      {/* Custom Bottom Navigation */}
      <BottomNav activeTab={getActiveTab()} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

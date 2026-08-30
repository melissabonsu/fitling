import { Fredoka_600SemiBold, useFonts } from '@expo-google-fonts/fredoka';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Fredoka_600SemiBold });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // The wordmark needs Fredoka, so hold on the bare gradient rather than
  // letting the logo pop in with a fallback face first.
  if (!fontsLoaded) {
    return <LinearGradient colors={Colors.backgroundGradient} style={styles.fill} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

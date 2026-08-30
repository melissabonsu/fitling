import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { FitlingWordmark } from '@/components/brand/fitling-wordmark';
import { SparkleIcon } from '@/components/icons';
import { BunnyPose } from '@/components/mascot';
import { Colors } from '@/constants/colors';

/**
 * Branded splash shown while the app figures out where to send you. The mascot
 * bobs so a slow network still looks alive rather than frozen.
 */
export function LoadingScreen() {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const shadowScale = bob.interpolate({ inputRange: [0, 1], outputRange: [1, 0.82] });

  return (
    <LinearGradient colors={Colors.backgroundGradient} style={styles.container}>
      <View style={styles.stack}>
        <FitlingWordmark width={250} />

        <View style={styles.stage}>
          <View style={[styles.spark, { left: '12%', top: '18%' }]}>
            <SparkleIcon width={20} height={20} />
          </View>
          <View style={[styles.spark, { right: '12%', top: '30%' }]}>
            <SparkleIcon width={16} height={16} />
          </View>

          <Animated.View style={{ transform: [{ translateY }] }}>
            <BunnyPose width={220} height={275} />
          </Animated.View>

          <Animated.View style={[styles.shadow, { transform: [{ scaleX: shadowScale }] }]} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    alignItems: 'center',
  },
  stage: {
    alignItems: 'center',
    marginTop: 8,
  },
  spark: {
    position: 'absolute',
  },
  shadow: {
    width: 120,
    height: 18,
    borderRadius: 60,
    backgroundColor: 'rgba(180, 96, 15, 0.14)',
    // Pulls the ellipse up under the mascot's feet, which sit well above the
    // bottom of its (generously padded) artboard.
    marginTop: -46,
  },
});

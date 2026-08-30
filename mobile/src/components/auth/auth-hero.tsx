import { StyleSheet, View } from 'react-native';

import { FitlingWordmark } from '@/components/brand/fitling-wordmark';
import {
  DumbbellIcon,
  FireIcon,
  HeartIcon,
  LightningIcon,
  SneakerIcon,
  SparkleIcon,
  TapeMeasureIcon,
  WaterDropIcon,
  XpCoinIcon,
} from '@/components/icons';
import { BunnyPose } from '@/components/mascot';

/**
 * Fitness props orbiting the mascot. Percentages keep the arrangement intact
 * across phone widths, and each entry carries its own rotation so the cluster
 * feels hand-scattered rather than gridded.
 */
const ORBIT = [
  { Icon: DumbbellIcon, left: '4%', top: '20%', size: 58, rotate: '0deg' },
  { Icon: TapeMeasureIcon, left: '0%', top: '46%', size: 54, rotate: '-8deg' },
  { Icon: XpCoinIcon, left: '5%', top: '68%', size: 52, rotate: '6deg' },
  { Icon: FireIcon, left: '79%', top: '19%', size: 52, rotate: '6deg' },
  { Icon: LightningIcon, left: '85%', top: '41%', size: 46, rotate: '4deg' },
  { Icon: WaterDropIcon, left: '80%', top: '58%', size: 40, rotate: '-6deg' },
  { Icon: SneakerIcon, left: '76%', top: '71%', size: 60, rotate: '-4deg' },
] as const;

const SPARKS = [
  { Icon: SparkleIcon, left: '20%', top: '12%', size: 20 },
  { Icon: SparkleIcon, left: '73%', top: '10%', size: 16 },
  { Icon: SparkleIcon, left: '90%', top: '30%', size: 14 },
  { Icon: SparkleIcon, left: '13%', top: '58%', size: 15 },
  { Icon: SparkleIcon, left: '68%', top: '80%', size: 18 },
  { Icon: HeartIcon, left: '11%', top: '33%', size: 20 },
  { Icon: HeartIcon, left: '88%', top: '13%', size: 18 },
  { Icon: HeartIcon, left: '25%', top: '82%', size: 15 },
] as const;

export function AuthHero() {
  return (
    <View style={styles.hero}>
      <FitlingWordmark width={250} />

      <View style={styles.stage}>
        <BunnyPose width={230} height={287} />

        {ORBIT.map(({ Icon, left, top, size, rotate }, index) => (
          <View
            key={`orbit-${index}`}
            pointerEvents="none"
            style={[styles.floating, { left, top, transform: [{ rotate }] }]}>
            <Icon width={size} height={size} />
          </View>
        ))}

        {SPARKS.map(({ Icon, left, top, size }, index) => (
          <View key={`spark-${index}`} pointerEvents="none" style={[styles.floating, { left, top }]}>
            <Icon width={size} height={size} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 8,
  },
  stage: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -6,
  },
  floating: {
    position: 'absolute',
  },
});

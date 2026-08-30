import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronRightIcon, HeartFilledIcon } from '@/components/icons';
import { Colors, Radii } from '@/constants/colors';

type BrandButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function BrandButton({ label, onPress, disabled = false, loading = false }: BrandButtonProps) {
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.shell,
        inactive && styles.inactive,
        pressed && !inactive && styles.pressed,
      ]}>
      <LinearGradient colors={Colors.buttonGradient} style={styles.face}>
        {loading ? (
          <ActivityIndicator color={Colors.card} />
        ) : (
          <>
            <HeartFilledIcon width={22} height={22} color={Colors.card} />
            <Text style={styles.label}>{label}</Text>
            <ChevronRightIcon width={22} height={22} color={Colors.card} />
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: Radii.button,
    // The lip peeking out below the gradient face reads as a raised edge.
    backgroundColor: Colors.buttonShadow,
    paddingBottom: 4,
  },
  inactive: {
    opacity: 0.55,
  },
  pressed: {
    paddingBottom: 0,
    marginTop: 4,
  },
  face: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radii.button,
    paddingHorizontal: 22,
    height: 60,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    color: Colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
});

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Radii } from '@/constants/colors';
import { clearToken, getToken } from '@/lib/auth';
import { Fitling, getFitling, UnauthorizedError } from '@/lib/fitling';

const STAT_LABELS: Record<keyof Fitling['stats'], string> = {
  strength: 'Strength',
  stamina: 'Stamina',
  discipline: 'Discipline',
  confidence: 'Confidence',
  flexibility: 'Flexibility',
  style: 'Style',
  recovery: 'Recovery',
};

type ViewState = 'checking' | 'loading' | 'ready' | 'error';

export default function Index() {
  const router = useRouter();
  const [state, setState] = useState<ViewState>('checking');
  const [fitling, setFitling] = useState<Fitling | null>(null);

  useEffect(() => {
    let isMounted = true;

    getToken()
      .catch(() => null)
      .then((token) => {
        if (!isMounted) return;
        if (!token) {
          router.replace('/log-in');
        } else {
          setState('loading');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (state !== 'loading') return;

    let isMounted = true;

    getFitling()
      .then((data) => {
        if (!isMounted) return;
        setFitling(data);
        setState('ready');
      })
      .catch((err) => {
        if (!isMounted) return;
        if (err instanceof UnauthorizedError) {
          clearToken()
            .catch(() => undefined)
            .then(() => router.replace('/log-in'));
        } else {
          setState('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [state, router]);

  async function handleLogOut() {
    await clearToken().catch(() => undefined);
    router.replace('/log-in');
  }

  return (
    <LinearGradient colors={Colors.backgroundGradient} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        {state === 'checking' || state === 'loading' ? (
          <View style={styles.centered}>
            <ActivityIndicator />
          </View>
        ) : state === 'error' ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>Couldn't load your Fitling.</Text>
            <Pressable onPress={() => setState('loading')}>
              <Text style={styles.retryText}>Try again</Text>
            </Pressable>
          </View>
        ) : (
          fitling && (
            <ScrollView contentContainerStyle={styles.content}>
              <Text style={styles.mascot}>🐰</Text>
              <Text style={styles.name}>{fitling.name}</Text>
              <Text style={styles.level}>Level {fitling.level}</Text>

              <View style={styles.statsCard}>
                {(Object.keys(STAT_LABELS) as (keyof Fitling['stats'])[]).map((key, index, all) => (
                  <View
                    key={key}
                    style={[styles.statRow, index === all.length - 1 && styles.statRowLast]}>
                    <Text style={styles.statLabel}>{STAT_LABELS[key]}</Text>
                    <Text style={styles.statValue}>{fitling.stats[key]}</Text>
                  </View>
                ))}
              </View>

              <Pressable onPress={handleLogOut} style={styles.logOut}>
                <Text style={styles.logOutText}>Log out</Text>
              </Pressable>
            </ScrollView>
          )
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    gap: 4,
  },
  mascot: {
    fontSize: 96,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  level: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  statsCard: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: Radii.input,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statRowLast: {
    borderBottomWidth: 0,
  },
  statLabel: {
    fontSize: 15,
    color: Colors.text,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text,
  },
  retryText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  logOut: {
    marginTop: 24,
  },
  logOutText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

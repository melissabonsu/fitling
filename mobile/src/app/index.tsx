import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getApiUrl } from '@/config/api';
import { Colors } from '@/constants/colors';
import { clearToken, getToken } from '@/lib/auth';

type BackendStatus = 'loading' | 'ok' | 'down';

export default function Index() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [status, setStatus] = useState<BackendStatus>('loading');

  useEffect(() => {
    let isMounted = true;

    getToken()
      .catch(() => null)
      .then((token) => {
        if (!isMounted) return;
        if (!token) {
          router.replace('/log-in');
        } else {
          setCheckingAuth(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  useEffect(() => {
    if (checkingAuth) return;

    let isMounted = true;

    fetch(`${getApiUrl()}/api/health`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (isMounted) setStatus(data.status === 'ok' ? 'ok' : 'down');
      })
      .catch(() => {
        if (isMounted) setStatus('down');
      });

    return () => {
      isMounted = false;
    };
  }, [checkingAuth]);

  async function handleLogOut() {
    await clearToken().catch(() => undefined);
    router.replace('/log-in');
  }

  return (
    <LinearGradient colors={Colors.backgroundGradient} style={styles.flex}>
      <SafeAreaView style={styles.container}>
        {checkingAuth || status === 'loading' ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>Fitling backend: {status}</Text>
        )}
        {!checkingAuth && (
          <Pressable onPress={handleLogOut} style={styles.logOut}>
            <Text style={styles.logOutText}>Log out</Text>
          </Pressable>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  logOut: {
    marginTop: 8,
  },
  logOutText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});

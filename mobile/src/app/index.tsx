import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getApiUrl } from '@/config/api';

type BackendStatus = 'loading' | 'ok' | 'down';

export default function Index() {
  const [status, setStatus] = useState<BackendStatus>('loading');

  useEffect(() => {
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>Fitling backend: {status}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

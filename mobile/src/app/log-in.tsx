import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthHero } from '@/components/auth/auth-hero';
import { EnvelopeIcon, HeartIcon, LockIcon } from '@/components/icons';
import { BrandButton } from '@/components/ui/brand-button';
import { BrandTextField } from '@/components/ui/brand-text-field';
import { Colors, Radii } from '@/constants/colors';
import { AuthError, logIn, saveToken } from '@/lib/auth';

export default function LogInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await logIn(email.trim(), password);
      await saveToken(token);
      router.replace('/');
    } catch (err) {
      setError(
        err instanceof AuthError
          ? err.messages.join(', ')
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LinearGradient colors={Colors.backgroundGradient} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <AuthHero />

            <View style={styles.card}>
              <View style={styles.headingRow}>
                <HeartIcon width={22} height={22} />
                <Text style={styles.heading}>Welcome back!</Text>
                <HeartIcon width={22} height={22} />
              </View>
              <Text style={styles.subheading}>Your Fitling has been waiting for you.</Text>

              {error && (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.fields}>
                <BrandTextField
                  icon={EnvelopeIcon}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                <BrandTextField
                  icon={LockIcon}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secure
                  autoComplete="current-password"
                  textContentType="password"
                />
              </View>

              <BrandButton
                label="Log In"
                onPress={handleSubmit}
                disabled={!email || !password}
                loading={submitting}
              />

              <View style={styles.footer}>
                <Text style={styles.footerPrompt}>New here? </Text>
                <Pressable onPress={() => router.push('/sign-up')} hitSlop={8}>
                  <Text style={styles.footerAction}>Create an account</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.card,
    marginHorizontal: 16,
    marginTop: 4,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 24,
    gap: 18,
    shadowColor: '#B4600F',
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.brown,
    textAlign: 'center',
  },
  subheading: {
    marginTop: -12,
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#FDEDED',
    borderRadius: Radii.input,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 14,
    textAlign: 'center',
  },
  fields: {
    gap: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerPrompt: {
    color: Colors.textMuted,
    fontSize: 15,
  },
  footerAction: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});

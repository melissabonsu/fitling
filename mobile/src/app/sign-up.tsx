import { useRouter } from 'expo-router';

import { AuthForm } from '@/components/auth-form';
import { saveToken, signUp } from '@/lib/auth';

export default function SignUpScreen() {
  const router = useRouter();

  async function handleSubmit(email: string, password: string) {
    const { token } = await signUp(email, password);
    await saveToken(token);
    router.replace('/');
  }

  return (
    <AuthForm
      title="Start your glow up journey with your Fitling"
      subtitle="Log workouts, recovery, and progress — your Fitling grows with you. No streaks to lose, ever."
      submitLabel="Create Account"
      onSubmit={handleSubmit}
      footerPrompt="Already have an account?"
      footerActionLabel="Log In"
      onFooterAction={() => router.push('/log-in')}
    />
  );
}

import { useRouter } from 'expo-router';

import { AuthForm } from '@/components/auth-form';
import { logIn, saveToken } from '@/lib/auth';

export default function LogInScreen() {
  const router = useRouter();

  async function handleSubmit(email: string, password: string) {
    const { token } = await logIn(email, password);
    await saveToken(token);
    router.replace('/');
  }

  return (
    <AuthForm
      title="Welcome back!"
      subtitle="Your Fitling is excited to see you."
      submitLabel="Log In"
      onSubmit={handleSubmit}
      footerPrompt="New here?"
      footerActionLabel="Create an account"
      onFooterAction={() => router.push('/sign-up')}
    />
  );
}

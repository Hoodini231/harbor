import { Redirect } from 'expo-router';

/**
 * Root index - Redirects to splash screen
 */
export default function Index() {
  return <Redirect href="/splash" />;
}

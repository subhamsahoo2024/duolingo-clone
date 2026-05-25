import { AuthScreen } from "@/components/auth-screen";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <AuthScreen
      mode="sign-up"
      title="Create your account"
      subtitle="Start your language journey today ✨"
      primaryLabel="Sign Up"
      footerPrefix="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/sign-in"
      backHref="/onboarding"
      showPassword
      defaultEmail=""
    />
  );
}

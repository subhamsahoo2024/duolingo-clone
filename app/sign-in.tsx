import { AuthScreen } from "@/components/auth-screen";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function SignInScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <AuthScreen
      mode="sign-in"
      title="Welcome back"
      subtitle="Continue your language journey today ✨"
      primaryLabel="Sign In"
      footerPrefix="Need an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/sign-up"
      backHref="/sign-up"
      showPassword={true}
      defaultEmail=""
    />
  );
}

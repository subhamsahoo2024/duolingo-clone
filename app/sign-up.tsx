import { AuthScreen } from "@/components/auth-screen";

export default function SignUpScreen() {
  return (
    <AuthScreen
      title="Create your account"
      subtitle="Start your language journey today ✨"
      primaryLabel="Sign Up"
      footerPrefix="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/sign-in"
      backHref="/onboarding"
      showPassword
      defaultEmail="alex@gmail.com"
    />
  );
}

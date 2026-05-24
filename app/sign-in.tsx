import { AuthScreen } from "@/components/auth-screen";

export default function SignInScreen() {
  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Continue your language journey today ✨"
      primaryLabel="Sign In"
      footerPrefix="Need an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/sign-up"
      backHref="/sign-up"
      showPassword={false}
      defaultEmail="alex@gmail.com"
    />
  );
}

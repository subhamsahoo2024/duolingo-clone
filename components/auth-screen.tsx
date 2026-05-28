import { useSSO, useSignIn, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type AuthScreenProps = {
  mode: "sign-in" | "sign-up";
  title: string;
  subtitle: string;
  primaryLabel: string;
  footerPrefix: string;
  footerLinkLabel: string;
  footerLinkHref: "/sign-up" | "/sign-in";
  backHref: "/onboarding" | "/sign-up";
  showPassword?: boolean;
  defaultEmail: string;
};

function SocialAuthButton({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: "google" | "facebook" | "apple";
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const iconColor = useMemo(() => {
    switch (icon) {
      case "google":
        return "#4285F4";
      case "facebook":
        return "#1877F2";
      case "apple":
        return "#0D132B";
    }
  }, [icon]);

  const iconName = useMemo(() => {
    switch (icon) {
      case "google":
        return "logo-google" as const;
      case "facebook":
        return "logo-facebook" as const;
      case "apple":
        return "logo-apple" as const;
    }
  }, [icon]);

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center rounded-2xl border border-border bg-white px-4 py-4"
      style={{ borderCurve: "continuous" }}
      disabled={disabled}
    >
      <Ionicons name={iconName} size={24} color={iconColor} />
      <Text className="ml-4 text-body-lg text-text-primary">{label}</Text>
    </Pressable>
  );
}

export function AuthScreen({
  mode,
  title,
  subtitle,
  primaryLabel,
  footerPrefix,
  footerLinkLabel,
  footerLinkHref,
  backHref,
  showPassword = true,
  defaultEmail,
}: AuthScreenProps) {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialSubmitting, setIsSocialSubmitting] = useState(false);

  const isSignInMode = mode === "sign-in";
  const passwordChecks = useMemo(
    () => ({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (isSignInMode) {
        const { error } = await signIn.password({
          emailAddress: email,
          password,
        });

        if (error) {
          setErrorMessage("Unable to sign in. Please check your details.");

          return;
        }

        if (signIn.status === "complete") {
          await signIn.finalize();
          router.replace("/");
          return;
        }

        setErrorMessage("Additional verification is required to continue.");
        return;
      }

      const { error } = await signUp.password({
        emailAddress: email,
        password,
      });

      if (error) {
        setErrorMessage("Unable to sign up. Please check your details.");

        return;
      }

      await signUp.verifications.sendEmailCode();
      router.push({ pathname: "/verification", params: { email, mode } });
    } catch (error) {
      const message =
        (error as { errors?: { message?: string }[] })?.errors?.[0]?.message ??
        "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_apple",
  ) => {
    if (isSocialSubmitting) {
      return;
    }

    setErrorMessage(null);
    setIsSocialSubmitting(true);

    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "duolingoclone",
        path: "oauth-callback",
      });
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
        return;
      }

      setErrorMessage("Social sign-in is not complete yet.");
    } catch (error) {
      const message =
        (error as { errors?: { message?: string }[] })?.errors?.[0]?.message ??
        "Social sign-in failed. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSocialSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1 bg-background"
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pb-10 pt-10">
          <Pressable
            onPress={() => router.replace(backHref)}
            className="h-12 w-12 items-center justify-center rounded-full"
          >
            <Ionicons name="chevron-back" size={28} color="#0D132B" />
          </Pressable>

          <View className="mt-6 gap-3">
            <Text className="text-h1 text-text-primary">{title}</Text>
            <Text className="text-body-lg text-text-secondary">{subtitle}</Text>
          </View>

          <View className="mt-8 items-center">
            <Image
              source={require("../assets/images/mascot-auth.png")}
              style={{ width: 260, height: 260 }}
              contentFit="contain"
            />
          </View>

          <View className="mt-4 gap-4">
            <View
              className="rounded-3xl border border-border bg-white px-4 py-4"
              style={{ borderCurve: "continuous" }}
            >
              <Text className="text-body-sm text-text-secondary">Email</Text>
              <TextInput
                className="mt-2 text-body-lg text-text-primary"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                placeholder="alex@gmail.com"
                placeholderTextColor="#6B7280"
              />
            </View>

            {showPassword ? (
              <View
                className="rounded-3xl border border-border bg-white px-4 py-4"
                style={{ borderCurve: "continuous" }}
              >
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-body-sm text-text-secondary">
                      Password
                    </Text>
                    <TextInput
                      className="mt-2 text-body-lg text-text-primary"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!passwordVisible}
                      autoComplete="password"
                      textContentType="password"
                      placeholder="********"
                      placeholderTextColor="#6B7280"
                    />
                  </View>
                  <Pressable
                    onPress={() => setPasswordVisible((value) => !value)}
                    hitSlop={12}
                    className="items-center justify-center"
                  >
                    <Ionicons
                      name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                      size={28}
                      color="#6B7280"
                    />
                  </Pressable>
                </View>

                {!isSignInMode ? (
                  <View className="mt-4 gap-1">
                    <Text
                      className={
                        passwordChecks.minLength
                          ? "text-body-sm text-success"
                          : "text-body-sm text-text-secondary"
                      }
                    >
                      - At least 8 characters
                    </Text>
                    <Text
                      className={
                        passwordChecks.hasUppercase
                          ? "text-body-sm text-success"
                          : "text-body-sm text-text-secondary"
                      }
                    >
                      - At least 1 uppercase character
                    </Text>
                    <Text
                      className={
                        passwordChecks.hasLowercase
                          ? "text-body-sm text-success"
                          : "text-body-sm text-text-secondary"
                      }
                    >
                      - At least 1 lowercase character
                    </Text>
                    <Text
                      className={
                        passwordChecks.hasSpecial
                          ? "text-body-sm text-success"
                          : "text-body-sm text-text-secondary"
                      }
                    >
                      - At least 1 special character
                    </Text>
                    <Text
                      className={
                        passwordChecks.hasNumber
                          ? "text-body-sm text-success"
                          : "text-body-sm text-text-secondary"
                      }
                    >
                      - At least 1 number
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            <Pressable
              onPress={handleSubmit}
              className="items-center justify-center rounded-3xl bg-lingua-purple px-6 py-5"
              style={{
                borderCurve: "continuous",
                shadowColor: "#6C4EF5",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.24,
                shadowRadius: 24,
                elevation: 12,
              }}
              disabled={isSubmitting}
            >
              <Text className="text-h4 text-white">
                {isSubmitting ? "Please wait..." : primaryLabel}
              </Text>
            </Pressable>

            {errorMessage ? (
              <Text className="text-body-sm text-error">{errorMessage}</Text>
            ) : null}

            <View className="flex-row items-center gap-3 py-1">
              <View className="h-px flex-1 bg-border" />
              <Text className="text-body-md text-text-secondary">
                or continue with
              </Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="gap-3">
              <SocialAuthButton
                icon="google"
                label="Continue with Google"
                onPress={() => handleSocialAuth("oauth_google")}
                disabled={isSocialSubmitting}
              />
              <SocialAuthButton
                icon="facebook"
                label="Continue with Facebook"
                onPress={() => handleSocialAuth("oauth_facebook")}
                disabled={isSocialSubmitting}
              />
              <SocialAuthButton
                icon="apple"
                label="Continue with Apple"
                onPress={() => handleSocialAuth("oauth_apple")}
                disabled={isSocialSubmitting}
              />
            </View>

            {isSignInMode ? null : <View nativeID="clerk-captcha" />}

            <View className="mt-6 flex-row items-center justify-center gap-1 pb-4">
              <Text className="text-body-md text-text-secondary">
                {footerPrefix}
              </Text>
              <Pressable onPress={() => router.push(footerLinkHref)}>
                <Text className="text-body-md text-lingua-purple">
                  {footerLinkLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

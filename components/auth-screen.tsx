import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
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
}: {
  icon: "google" | "facebook" | "apple";
  label: string;
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
      className="flex-row items-center justify-center rounded-2xl border border-border bg-white px-4 py-4"
      style={{ borderCurve: "continuous" }}
    >
      <Ionicons name={iconName} size={24} color={iconColor} />
      <Text className="ml-4 text-body-lg text-text-primary">{label}</Text>
    </Pressable>
  );
}

export function AuthScreen({
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
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("password123");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
              </View>
            ) : null}

            <Pressable
              onPress={() =>
                router.push({ pathname: "/verification", params: { email } })
              }
              className="items-center justify-center rounded-3xl bg-lingua-purple px-6 py-5"
              style={{
                borderCurve: "continuous",
                boxShadow: "0 12px 24px rgba(108, 78, 245, 0.24)",
              }}
            >
              <Text className="text-h4 text-white">{primaryLabel}</Text>
            </Pressable>

            <View className="flex-row items-center gap-3 py-1">
              <View className="h-px flex-1 bg-border" />
              <Text className="text-body-md text-text-secondary">
                or continue with
              </Text>
              <View className="h-px flex-1 bg-border" />
            </View>

            <View className="gap-3">
              <SocialAuthButton icon="google" label="Continue with Google" />
              <SocialAuthButton
                icon="facebook"
                label="Continue with Facebook"
              />
              <SocialAuthButton icon="apple" label="Continue with Apple" />
            </View>

            <View className="mt-6 flex-row items-center justify-center gap-1 pb-4">
              <Text className="text-body-md text-text-secondary">
                {footerPrefix}
              </Text>
              <Link href={footerLinkHref} asChild>
                <Pressable>
                  <Text className="text-body-md text-lingua-purple">
                    {footerLinkLabel}
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

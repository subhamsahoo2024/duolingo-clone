import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export function VerificationModal() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const didNavigateRef = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (code.length === 6 && !didNavigateRef.current) {
      didNavigateRef.current = true;
      router.replace("/");
    }
  }, [code, router]);

  return (
    <View className="flex-1 bg-black/25 px-5 justify-center">
      <KeyboardAvoidingView
        behavior={process.env.EXPO_OS === "ios" ? "padding" : undefined}
      >
        <View
          className="rounded-4xl border border-border bg-white px-6 py-6"
          style={{ borderCurve: "continuous" }}
        >
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1 gap-2">
              <Text className="text-h3 text-text-primary">
                Check your email
              </Text>
              <Text className="text-body-md text-text-secondary">
                We sent a 6-digit verification code to {email ?? "your inbox"}.
                Enter it below to continue.
              </Text>
            </View>
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full bg-surface"
            >
              <Ionicons name="close" size={22} color="#0D132B" />
            </Pressable>
          </View>

          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="mt-6 flex-row justify-between gap-2"
          >
            {Array.from({ length: 6 }).map((_, index) => {
              const digit = code[index] ?? "";

              return (
                <View
                  key={`digit-${index}`}
                  className="h-14 flex-1 items-center justify-center rounded-2xl border border-border bg-white"
                  style={{ borderCurve: "continuous" }}
                >
                  <Text className="text-h3 text-text-primary">{digit}</Text>
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={(value) =>
              setCode(value.replace(/[^0-9]/g, "").slice(0, 6))
            }
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={6}
            caretHidden
            returnKeyType="done"
            className="absolute h-0 w-0 opacity-0"
          />

          <Text className="mt-5 text-center text-body-sm text-text-secondary">
            The code will verify automatically as soon as all 6 digits are
            entered.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

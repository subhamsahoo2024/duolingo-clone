import { useAuth, useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { languages } from "../data/languages";
import {
  LANGUAGE_STORAGE_KEY,
  useLanguageStore,
} from "../store/language-store";

export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { selectedLanguageId, clearSelectedLanguage, hasHydrated } =
    useLanguageStore();

  const selectedLanguage = languages.find(
    (language) => language.id === selectedLanguageId,
  );

  if (!isLoaded || !hasHydrated) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  if (!selectedLanguageId) {
    return <Redirect href="/language-selection" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-6">
      <View className="items-center">
        <Text className="text-h1 text-lingua-purple">Muolingo</Text>
        <Text className="mt-2 text-body-md text-text-secondary">
          Learning {selectedLanguage?.name ?? "your language"}
        </Text>
      </View>
      <View className="items-center gap-3">
        {isSignedIn ? (
          <>
            <Text className="text-body-md text-text-secondary">
              Signed in as {user?.emailAddresses[0]?.emailAddress ?? "User"}
            </Text>
            <Pressable
              onPress={() => signOut()}
              className="rounded-full border border-border px-5 py-2"
            >
              <Text className="text-body-md text-text-primary">Sign out</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/language-selection")}
              className="rounded-full border border-border px-5 py-2"
            >
              <Text className="text-body-md text-text-primary">
                Choose language
              </Text>
            </Pressable>
            <Pressable
              onPress={async () => {
                await AsyncStorage.removeItem(LANGUAGE_STORAGE_KEY);
                clearSelectedLanguage();
              }}
              className="rounded-full border border-border px-5 py-2"
            >
              <Text className="text-body-md text-text-primary">
                Clear storage
              </Text>
            </Pressable>
          </>
        ) : (
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.push("/sign-in")}
              className="rounded-full border border-border px-5 py-2"
            >
              <Text className="text-body-md text-text-primary">Sign in</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/sign-up")}
              className="rounded-full bg-lingua-purple px-5 py-2"
            >
              <Text className="text-body-md text-white">Sign up</Text>
            </Pressable>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => router.push("/onboarding")}
        className="rounded-full bg-lingua-purple px-6 py-3"
      >
        <Text className="text-body-md">Open Onboarding</Text>
      </Pressable>
    </View>
  );
}

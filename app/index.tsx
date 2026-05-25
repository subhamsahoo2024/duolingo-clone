import { useAuth, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-6">
      <View className="items-center">
        <Text className="text-h1 text-lingua-purple">Lingua</Text>
        <Text className="mt-2 text-body-md text-text-secondary">
          Hello, World!
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
      <Pressable
        onPress={() => router.push("/language-selection")}
        className="rounded-full border border-border px-6 py-3"
      >
        <Text className="text-body-md text-text-primary">Choose Language</Text>
      </Pressable>
    </View>
  );
}

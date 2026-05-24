import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-6">
      <View className="items-center">
        <Text className="text-h1 text-lingua-purple">Lingua</Text>
        <Text className="mt-2 text-body-md text-text-secondary">
          Hello, World!
        </Text>
      </View>
      <Link href="/onboarding" asChild>
        <Pressable className="rounded-full bg-lingua-purple px-6 py-3">
          <Text className="text-body-md">Open Onboarding</Text>
        </Pressable>
      </Link>
    </View>
  );
}

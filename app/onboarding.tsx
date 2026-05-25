import { useAuth } from "@clerk/expo";
import { Image } from "expo-image";
import { Link, Redirect } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function OnboardingScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 px-6 pb-12 pt-10">
        <View className="items-center gap-3">
          <View className="flex-row items-center gap-3">
            <Image
              source={require("../assets/images/moscot-logo.png")}
              style={{ width: 44, height: 44 }}
              contentFit="contain"
            />
            <Text className="text-h2 text-text-primary">muolingo</Text>
          </View>
        </View>

        <View className="mt-10 gap-4">
          <Text className="text-h1 text-text-primary">Your AI language</Text>
          <Text className="text-h1 text-lingua-purple">teacher.</Text>
          <Text className="text-body-lg text-text-secondary">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        <View className="mt-10 items-center">
          <View className="w-full">
            <View
              className="self-start rounded-2xl px-4 py-2"
              style={{ backgroundColor: "#F1F5FF" }}
            >
              <Text className="text-body-md text-text-primary">Hello!</Text>
            </View>
            <View
              className="mt-4 self-end rounded-2xl px-4 py-2"
              style={{ backgroundColor: "rgba(108, 78, 245, 0.12)" }}
            >
              <Text className="text-body-md text-lingua-purple">¡Hola!</Text>
            </View>
            <View
              className="mt-4 self-end rounded-2xl px-4 py-2"
              style={{ backgroundColor: "rgba(255, 200, 0, 0.16)" }}
            >
              <Text className="text-body-md text-text-primary">你好!</Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/mascot-welcome.png")}
            style={{ width: 260, height: 260 }}
            contentFit="contain"
          />
        </View>

        <Link href="/sign-up" asChild>
          <Pressable className="mt-10 flex-row items-center justify-center rounded-2xl bg-lingua-purple px-6 py-4">
            <Text className="text-body-lg text-white">Get Started</Text>
            <Text className="ml-4 text-body-lg text-white">›</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-h1 text-text-primary text-color-lingua-purple">
        Lingua
      </Text>
      <Text className="mt-2 text-body-md text-text-secondary">
        Hello, World!
      </Text>
    </View>
  );
}

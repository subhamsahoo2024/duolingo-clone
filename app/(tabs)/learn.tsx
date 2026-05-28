import { Text, View } from "react-native";

export default function LearnPlaceholder() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-h3 text-text-primary">Learn</Text>
      <Text className="mt-2 text-body-md text-text-secondary">
        Learn screen placeholder.
      </Text>
    </View>
  );
}

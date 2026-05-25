import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { languages } from "../data/languages";

const learnerCounts: Record<string, string> = {
  es: "28.4M learners",
  fr: "19.4M learners",
  ja: "12.7M learners",
};

const flagCountryCodes: Record<string, string> = {
  es: "es",
  fr: "fr",
  ja: "jp",
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(languages[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return languages;
    }

    return languages.filter((language) => {
      const name = language.name.toLowerCase();
      const nativeName = language.nativeName.toLowerCase();

      return (
        name.includes(normalizedQuery) || nativeName.includes(normalizedQuery)
      );
    });
  }, [searchQuery]);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 px-6 pb-12 pt-6">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            <Text className="text-body-md text-text-primary">&lt;</Text>
          </Pressable>
          <Text className="text-h3 text-text-primary">Choose a language</Text>
          <View className="h-10 w-10" />
        </View>

        <View className="mt-6 flex-row items-center rounded-full border border-border bg-surface px-4 py-2">
          <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-white">
            <Text className="text-body-sm text-text-secondary">S</Text>
          </View>
          <TextInput
            className="flex-1 text-body-md text-text-primary"
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View className="mt-6">
          <Text className="text-h4 text-text-primary">Popular</Text>

          <View className="mt-4 gap-3">
            {filteredLanguages.map((language) => {
              const isSelected = language.id === selectedId;

              return (
                <Pressable
                  key={language.id}
                  onPress={() => setSelectedId(language.id)}
                  className={`flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                    isSelected
                      ? "border-lingua-purple bg-surface"
                      : "border-border bg-white"
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View className="h-12 w-12 items-center justify-center rounded-full border border-border bg-white">
                      <Image
                        source={{
                          uri: `https://flagcdn.com/w80/${
                            flagCountryCodes[language.id] ?? "IN"
                          }.png`,
                        }}
                        style={{ width: 36, height: 36, borderRadius: 18 }}
                        contentFit="cover"
                      />
                    </View>
                    <View>
                      <Text className="text-body-lg text-text-primary">
                        {language.name}
                      </Text>
                      <Text className="text-body-sm text-text-secondary">
                        {learnerCounts[language.id] ?? language.description}
                      </Text>
                    </View>
                  </View>
                  {isSelected ? (
                    <View className="h-8 w-8 items-center justify-center rounded-full bg-lingua-purple">
                      <Text className="text-body-sm text-white">✓</Text>
                    </View>
                  ) : (
                    <Text className="text-body-lg text-text-secondary">
                      &gt;
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/")}
          className="mt-8 items-center justify-center rounded-2xl bg-lingua-purple px-6 py-4"
        >
          <Text className="text-body-lg text-white">Confirm</Text>
        </Pressable>

        <View className="mt-10 items-center">
          <Image
            source={require("../assets/images/earth.png")}
            style={{ width: 260, height: 180 }}
            contentFit="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

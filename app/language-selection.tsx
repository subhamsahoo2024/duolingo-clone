import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { languages } from "../data/languages";
import { useLanguageStore } from "../store/language-store";

type LanguageMeta = {
  countryCode: string;
  learners: string;
};

const languageMeta: Record<string, LanguageMeta> = {
  es: { countryCode: "es", learners: "28.4M" },
  fr: { countryCode: "fr", learners: "19.4M" },
  ja: { countryCode: "jp", learners: "12.7M" },
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { selectedLanguageId, setSelectedLanguageId } = useLanguageStore();
  const [selectedId, setSelectedId] = useState(
    selectedLanguageId ?? languages[0]?.id ?? "",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const flagWidth = 160;
  const languageCards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = normalizedQuery
      ? languages.filter((language) =>
          [language.name, language.nativeName, language.code]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedQuery)),
        )
      : languages;

    return filtered.map((language) => {
      const meta = languageMeta[language.code];
      const countryCode = meta?.countryCode ?? "us";
      const flagUrl = `https://flagcdn.com/w${flagWidth}/${countryCode}.png`;

      return {
        ...language,
        learners: meta?.learners ?? "",
        flagUrl,
      };
    });
  }, [flagWidth, searchQuery]);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 px-6 pb-6 pt-6">
        <View>
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <Ionicons name="chevron-back" size={20} color="#0D132B" />
            </Pressable>
            <Text className="text-h3 text-text-primary">Choose a language</Text>
            <View className="h-10 w-10" />
          </View>

          <View className="mt-6 flex-row items-center rounded-full border border-border bg-white px-4 py-3">
            <Ionicons name="search" size={18} color="#6B7280" />
            <TextInput
              placeholder="Search languages"
              placeholderTextColor="#9CA3AF"
              className="ml-3 flex-1 text-body-md text-text-primary"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Text className="mt-6 text-h4 text-text-primary">Popular</Text>

          <View className="mt-4 gap-3">
            {languageCards.length === 0 ? (
              <View className="items-center rounded-2xl border border-border bg-white px-4 py-6">
                <Text className="text-body-md text-text-secondary">
                  No languages found.
                </Text>
              </View>
            ) : (
              languageCards.map((language) => {
                const isSelected = language.id === selectedId;

                return (
                  <Pressable
                    key={language.id}
                    onPress={() => setSelectedId(language.id)}
                    className={`flex-row items-center justify-between rounded-2xl border px-4 py-4 ${
                      isSelected
                        ? "border-lingua-purple bg-surface"
                        : "border-border bg-white"
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={{ uri: language.flagUrl }}
                        style={{ width: 42, height: 42, borderRadius: 21 }}
                        contentFit="cover"
                      />
                      <View>
                        <Text className="text-body-lg text-text-primary">
                          {language.name}
                        </Text>
                        {language.learners ? (
                          <Text className="text-body-sm text-text-secondary">
                            {language.learners} learners
                          </Text>
                        ) : null}
                      </View>
                    </View>

                    {isSelected ? (
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-lingua-purple">
                        <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                      </View>
                    ) : (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#9CA3AF"
                      />
                    )}
                  </Pressable>
                );
              })
            )}
          </View>

          <Pressable
            className="mt-6 rounded-2xl bg-lingua-purple px-6 py-4"
            onPress={() => {
              if (!selectedId) {
                return;
              }

              setSelectedLanguageId(selectedId);
              router.replace("/");
            }}
          >
            <Text className="text-center text-body-lg text-white">
              Continue
            </Text>
          </Pressable>
        </View>

        <View className="mt-6">
          <Image
            source={require("../assets/images/earth.png")}
            style={{ width: "100%", height: undefined, aspectRatio: 1.6 }}
            contentFit="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

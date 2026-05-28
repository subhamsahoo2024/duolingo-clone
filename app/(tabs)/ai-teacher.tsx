import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { images } from "../../assets/images";
import { languages } from "../../data/languages";
import { lessons } from "../../data/lessons";
import { units } from "../../data/units";
import { useLanguageStore } from "../../store/language-store";

const STATUS_DOT_SIZE = 8;

export default function AiTeacherScreen() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId?: string }>();
  const { selectedLanguageId } = useLanguageStore();

  const normalizedLessonId = Array.isArray(lessonId) ? lessonId[0] : lessonId;

  const selectedLanguage = useMemo(
    () =>
      languages.find((language) => language.id === selectedLanguageId) ??
      languages[0],
    [selectedLanguageId],
  );

  const fallbackLesson = useMemo(() => {
    const languageUnits = units
      .filter((unit) => unit.languageId === selectedLanguage?.id)
      .sort((a, b) => a.order - b.order);

    const unit = languageUnits[0] ?? units[0];
    const unitLessonId = unit?.lessonIds[0];

    return lessons.find((lesson) => lesson.id === unitLessonId) ?? lessons[0];
  }, [selectedLanguage]);

  const activeLesson = useMemo(() => {
    if (!normalizedLessonId) {
      return fallbackLesson;
    }

    return (
      lessons.find((lesson) => lesson.id === normalizedLessonId) ??
      fallbackLesson
    );
  }, [fallbackLesson, normalizedLessonId]);

  const activeUnit = useMemo(
    () => units.find((unit) => unit.id === activeLesson.unitId),
    [activeLesson],
  );

  const activeLanguage = useMemo(
    () =>
      languages.find((language) => language.id === activeUnit?.languageId) ??
      selectedLanguage ??
      languages[0],
    [activeUnit, selectedLanguage],
  );

  const teacherPhrase = activeLesson.phrases[0];

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className="px-6 pb-10 pt-6">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full border border-border"
          >
            <Ionicons name="chevron-back" size={20} color="#0D132B" />
          </Pressable>

          <View className="ml-3 flex-1">
            <Text className="text-h3 text-text-primary">AI Teacher</Text>
            <View className="mt-1 flex-row items-center">
              <View
                style={{
                  width: STATUS_DOT_SIZE,
                  height: STATUS_DOT_SIZE,
                  borderRadius: STATUS_DOT_SIZE / 2,
                  backgroundColor: "#21C16B",
                }}
              />
              <Text className="ml-2 text-body-sm text-text-secondary">
                Online
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-border">
              <Ionicons name="videocam-outline" size={18} color="#6B7280" />
            </Pressable>
            <View className="h-10 w-10 items-center justify-center rounded-full border border-border">
              <Text className="text-body-sm text-text-primary">12</Text>
            </View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full border border-border">
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#6B7280"
              />
            </Pressable>
          </View>
        </View>

        <View className="mt-6 overflow-hidden rounded-3xl bg-surface">
          <View style={{ height: 400 }}>
            <View className="flex-1 items-center justify-end">
              <Image
                source={images.mascotWelcome}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                contentPosition="bottom"
              />
            </View>
          </View>
        </View>

        <View className="mt-5">
          <View
            className="self-start rounded-2xl bg-white px-4 py-3"
            style={styles.bubbleShadow}
          >
            <Text className="text-body-md text-text-primary">¡Muy bien!</Text>
            <Text className="mt-1 text-body-md text-text-secondary">
              {teacherPhrase
                ? `Repeat: ${teacherPhrase.text}`
                : "That was great!"}
            </Text>
            <View className="mt-3 flex-row items-center justify-between">
              <Text className="text-caption text-text-secondary">
                AI Teacher
              </Text>
              <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-[#F2EEFF]">
                <Ionicons name="volume-medium" size={16} color="#6C4EF5" />
              </Pressable>
            </View>
            <View style={styles.bubbleTail} />
          </View>
        </View>

        <View className="mt-6 flex-row items-center justify-between">
          <View className="items-center">
            <Pressable className="h-14 w-14 items-center justify-center rounded-full border border-border bg-white">
              <Ionicons name="videocam-outline" size={22} color="#0D132B" />
            </Pressable>
            <Text className="mt-2 text-caption text-text-secondary">
              Camera
            </Text>
          </View>
          <View className="items-center">
            <Pressable className="h-14 w-14 items-center justify-center rounded-full border border-border bg-white">
              <Ionicons name="mic" size={22} color="#0D132B" />
            </Pressable>
            <Text className="mt-2 text-caption text-text-secondary">Mic</Text>
          </View>
          <View className="items-center">
            <Pressable className="h-14 w-14 items-center justify-center rounded-full border border-border bg-white">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22}
                color="#0D132B"
              />
            </Pressable>
            <Text className="mt-2 text-caption text-text-secondary">
              Subtitles
            </Text>
          </View>
          <View className="items-center">
            <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-[#FF4D4F]">
              <Ionicons name="call" size={22} color="#FFFFFF" />
            </Pressable>
            <Text className="mt-2 text-caption text-text-secondary">
              End Call
            </Text>
          </View>
        </View>

        <View className="mt-6 rounded-3xl bg-white px-4 py-5">
          <View className="flex-row items-center">
            <View className="flex-1 items-center">
              <Text className="text-body-sm text-text-secondary">Speaking</Text>
              <Text className="mt-2 text-body-md text-lingua-green">
                Excellent
              </Text>
            </View>
            <View className="h-10 w-px bg-border" />
            <View className="flex-1 items-center">
              <Text className="text-body-sm text-text-secondary">
                Pronunciation
              </Text>
              <Text className="mt-2 text-body-md text-lingua-purple">
                Great
              </Text>
            </View>
            <View className="h-10 w-px bg-border" />
            <View className="flex-1 items-center">
              <Text className="text-body-sm text-text-secondary">Grammar</Text>
              <Text className="mt-2 text-body-md text-[#4D8BFF]">Good</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bubbleShadow: {
    shadowColor: "#0D132B",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  bubbleTail: {
    position: "absolute",
    left: 24,
    bottom: -6,
    width: 14,
    height: 14,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
});

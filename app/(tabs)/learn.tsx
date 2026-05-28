import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { images } from "../../assets/images";
import { languages } from "../../data/languages";
import { lessons } from "../../data/lessons";
import { units } from "../../data/units";
import { useLanguageStore } from "../../store/language-store";

type LessonStatus = "completed" | "inProgress" | "locked";

const lessonArtwork: Record<string, number | { uri: string }> = {
  "lesson-es-1": images.mascotWelcome,
  "lesson-es-2": images.mascotAuth,
  "lesson-es-3": images.palace,
  "lesson-es-4": images.earth,
  "lesson-es-5": images.treasure,
  "lesson-es-6": images.streakFire,
  "lesson-fr-1": images.mascotWelcome,
  "lesson-fr-2": images.mascotAuth,
  "lesson-fr-3": images.palace,
  "lesson-fr-4": images.earth,
  "lesson-fr-5": images.treasure,
  "lesson-fr-6": images.streakFire,
  "lesson-ja-1": images.mascotWelcome,
  "lesson-ja-2": images.mascotAuth,
  "lesson-ja-3": images.palace,
  "lesson-ja-4": images.earth,
  "lesson-ja-5": images.treasure,
  "lesson-ja-6": images.streakFire,
};

const getPlaceholderImage = (seed: string) => ({
  uri: `https://picsum.photos/seed/${seed}/160/160`,
});

export default function LearnScreen() {
  const router = useRouter();
  const { selectedLanguageId } = useLanguageStore();
  const [activeTab, setActiveTab] = useState<"lessons" | "practice">("lessons");
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const selectedLanguage = useMemo(
    () =>
      languages.find((language) => language.id === selectedLanguageId) ??
      languages[0],
    [selectedLanguageId],
  );

  const currentUnit = useMemo(() => {
    const languageUnits = units
      .filter((unit) => unit.languageId === selectedLanguage?.id)
      .sort((a, b) => a.order - b.order);
    return languageUnits[0];
  }, [selectedLanguage]);

  const unitLessons = useMemo(() => {
    if (!currentUnit) {
      return [];
    }

    return currentUnit.lessonIds
      .map((lessonId) => lessons.find((lesson) => lesson.id === lessonId))
      .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson))
      .sort((a, b) => a.order - b.order);
  }, [currentUnit]);

  const lessonStatusMap = useMemo(() => {
    return unitLessons.reduce<Record<string, LessonStatus>>(
      (accumulator, lesson, index) => {
        if (index < 2) {
          accumulator[lesson.id] = "completed";
        } else if (index === 2) {
          accumulator[lesson.id] = "inProgress";
        } else {
          accumulator[lesson.id] = "locked";
        }
        return accumulator;
      },
      {},
    );
  }, [unitLessons]);

  useEffect(() => {
    if (unitLessons.length === 0) {
      return;
    }

    if (
      activeLessonId &&
      unitLessons.some((lesson) => lesson.id === activeLessonId)
    ) {
      return;
    }

    const inProgressLesson = unitLessons.find(
      (lesson) => lessonStatusMap[lesson.id] === "inProgress",
    );

    setActiveLessonId(inProgressLesson?.id ?? unitLessons[0].id);
  }, [activeLessonId, lessonStatusMap, unitLessons]);

  const activeLesson = useMemo(() => {
    if (!activeLessonId) {
      return unitLessons[0];
    }

    return (
      unitLessons.find((lesson) => lesson.id === activeLessonId) ??
      unitLessons[0]
    );
  }, [activeLessonId, unitLessons]);

  const completedCount = unitLessons.filter(
    (lesson) => lessonStatusMap[lesson.id] === "completed",
  ).length;
  const inProgressCount = unitLessons.some(
    (lesson) => lessonStatusMap[lesson.id] === "inProgress",
  )
    ? 1
    : 0;
  const progressCount = completedCount + inProgressCount;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className="px-6 pb-8 pt-6">
        <View className="flex-row items-center justify-between">
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="chevron-back" size={20} color="#0D132B" />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="bookmark-outline" size={18} color="#FF8A00" />
          </Pressable>
        </View>

        <Text className="mt-4 text-h2 text-text-primary">
          {activeLesson?.title ?? "Lessons"}
        </Text>
        <Text className="mt-2 text-body-md text-text-secondary">
          Unit {currentUnit?.order ?? 1} - {progressCount} /{" "}
          {unitLessons.length} lessons
        </Text>

        <View className="mt-6 overflow-hidden rounded-3xl bg-surface">
          <Image
            source={
              activeLesson
                ? (lessonArtwork[activeLesson.id] ??
                  getPlaceholderImage(activeLesson.id))
                : images.palace
            }
            style={{ width: "100%", height: 190 }}
            contentFit="contain"
            contentPosition="center"
          />
        </View>

        <View className="mt-6 rounded-3xl bg-surface p-2">
          <View className="flex-row">
            <Pressable
              onPress={() => setActiveTab("lessons")}
              className={`flex-1 items-center rounded-2xl px-4 py-3 ${
                activeTab === "lessons" ? "bg-white" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-body-md ${
                  activeTab === "lessons"
                    ? "text-lingua-purple"
                    : "text-text-secondary"
                }`}
              >
                Lessons
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveTab("practice")}
              className={`flex-1 items-center rounded-2xl px-4 py-3 ${
                activeTab === "practice" ? "bg-white" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-body-md ${
                  activeTab === "practice"
                    ? "text-lingua-purple"
                    : "text-text-secondary"
                }`}
              >
                Practice
              </Text>
            </Pressable>
          </View>
        </View>

        {activeTab === "lessons" && (
          <View className="mt-6 gap-4">
            {unitLessons.map((lesson) => {
              const status = lessonStatusMap[lesson.id];
              const isActive = lesson.id === activeLesson?.id;

              const statusCopy =
                status === "completed"
                  ? "Completed"
                  : status === "inProgress"
                    ? "In progress"
                    : `${lesson.activities.length} activities`;

              const statusColor =
                status === "completed"
                  ? "#21C16B"
                  : status === "inProgress"
                    ? "#6C4EF5"
                    : "#6B7280";

              const statusIcon =
                status === "completed"
                  ? "checkmark"
                  : status === "locked"
                    ? "lock-closed"
                    : null;

              return (
                <Pressable
                  key={lesson.id}
                  onPress={() => {
                    setActiveLessonId(lesson.id);
                    router.push({
                      pathname: "/(tabs)/ai-teacher",
                      params: { lessonId: lesson.id },
                    });
                  }}
                  className={`flex-row items-center justify-between rounded-2xl border px-4 py-4 ${
                    isActive
                      ? "border-lingua-purple bg-[#F6F1FF]"
                      : "border-border bg-white"
                  }`}
                  style={{
                    shadowColor: "#0D132B",
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 2,
                  }}
                >
                  <View className="flex-1 pr-3">
                    <Text className="text-caption text-text-secondary">
                      Lesson {lesson.order}
                    </Text>
                    <Text className="mt-1 text-body-lg text-text-primary">
                      {lesson.title}
                    </Text>
                    <Text
                      className="mt-1 text-body-sm"
                      style={{ color: statusColor }}
                    >
                      {statusCopy}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-3">
                    {statusIcon && (
                      <View
                        className="h-8 w-8 items-center justify-center rounded-full"
                        style={{
                          backgroundColor:
                            status === "completed" ? "#E9F9F0" : "#F3F4F6",
                        }}
                      >
                        <Ionicons
                          name={statusIcon}
                          size={16}
                          color={statusColor}
                        />
                      </View>
                    )}
                    <Image
                      source={
                        lessonArtwork[lesson.id] ??
                        getPlaceholderImage(lesson.id)
                      }
                      style={{ width: 44, height: 44 }}
                      contentFit="contain"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {activeTab === "practice" && (
          <View className="mt-6 items-center rounded-2xl bg-white px-6 py-8">
            <Ionicons name="sparkles" size={24} color="#6C4EF5" />
            <Text className="mt-3 text-body-md text-text-primary">
              Practice sessions are coming soon.
            </Text>
            <Text className="mt-1 text-body-sm text-text-secondary">
              Keep working through lessons to unlock practice.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

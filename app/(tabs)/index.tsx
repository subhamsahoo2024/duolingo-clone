import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { images } from "../../assets/images";
import { languages } from "../../data/languages";
import { lessons } from "../../data/lessons";
import { units } from "../../data/units";
import { useLanguageStore } from "../../store/language-store";

const DAILY_GOAL_XP = 20;

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguageId } = useLanguageStore();

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

  const currentLesson = useMemo(() => {
    const lessonId = currentUnit?.lessonIds[0];
    return lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0];
  }, [currentUnit]);

  const currentXp = useMemo(() => {
    if (!currentLesson) {
      return 0;
    }

    const weightedXp =
      currentLesson.activities.length * 5 +
      currentLesson.vocabulary.length * 2 +
      currentLesson.phrases.length * 0.5;

    return Math.min(DAILY_GOAL_XP, Math.round(weightedXp));
  }, [currentLesson]);

  const progressPercent = DAILY_GOAL_XP
    ? Math.min(1, currentXp / DAILY_GOAL_XP)
    : 0;

  const displayName =
    user?.firstName ??
    user?.username ??
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ??
    "there";

  const avatarImage = user?.imageUrl
    ? { uri: user.imageUrl }
    : images.mascotWelcome;

  const planItems = [
    {
      id: "lesson",
      title: "Lesson",
      subtitle: currentLesson?.title ?? "Lesson",
      icon: "book" as const,
      color: "#6C4EF5",
      completed: true,
    },
    {
      id: "conversation",
      title: "AI Conversation",
      subtitle: currentLesson?.description ?? "Practice speaking",
      icon: "headset" as const,
      color: "#4D8BFF",
      completed: false,
    },
    {
      id: "words",
      title: "New words",
      subtitle: `${currentLesson?.vocabulary.length ?? 0} words`,
      icon: "chatbubble-ellipses" as const,
      color: "#FF6B6B",
      completed: false,
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className="px-6 pb-10 pt-8">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Image
              source={images.mascotLogo}
              style={{ width: 36, height: 36, borderRadius: 18 }}
              contentFit="cover"
            />
            <Text className="ml-3 text-h4 text-text-primary">
              Hola, {displayName}!
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Image
                source={images.streakFire}
                style={{ width: 20, height: 20 }}
                contentFit="contain"
              />
              <Text className="ml-2 text-body-md text-text-primary">12</Text>
            </View>
            <Pressable className="h-9 w-9 items-center justify-center rounded-full">
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#0D132B"
              />
            </Pressable>
          </View>
        </View>

        <View
          className="mt-6 flex-row items-center justify-between rounded-3xl px-5 py-4"
          style={{ backgroundColor: "#FFF2E8" }}
        >
          <View className="flex-1">
            <Text className="text-body-md text-text-secondary">Daily goal</Text>
            <Text className="mt-2 text-h2 text-text-primary">
              {currentXp}
              <Text className="text-body-md text-text-secondary">
                {" "}
                / {DAILY_GOAL_XP} XP
              </Text>
            </Text>
            <View className="mt-3 h-2 w-full rounded-full bg-[#FFE4C7]">
              <View
                className="h-2 rounded-full bg-[#FF8A00]"
                style={{ width: `${progressPercent * 100}%` }}
              />
            </View>
          </View>
          <Image
            source={images.treasure}
            style={{ width: 76, height: 76 }}
            contentFit="contain"
          />
        </View>

        <View
          className="mt-6 overflow-hidden rounded-3xl px-6 py-5"
          style={{ backgroundColor: "#6C4EF5" }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-body-sm" style={{ color: "#E7E2FF" }}>
                Continue learning
              </Text>
              <Text className="mt-2 text-h2 text-white">
                {selectedLanguage?.name ?? "Spanish"}
              </Text>
              <Text className="mt-1 text-body-sm" style={{ color: "#E7E2FF" }}>
                A1 - {currentUnit?.title ?? "Unit 1"}
              </Text>
              <Pressable className="mt-4 self-start rounded-2xl bg-white px-5 py-2">
                <Text className="text-body-md text-lingua-purple">
                  Continue
                </Text>
              </Pressable>
            </View>
            <Image
              source={images.palace}
              style={{ width: 150, height: 120 }}
              contentFit="contain"
            />
          </View>
        </View>

        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-h4 text-text-primary">Today's plan</Text>
          <Pressable>
            <Text className="text-body-sm text-lingua-purple">View all</Text>
          </Pressable>
        </View>

        <View className="mt-4 gap-4">
          {planItems.map((item) => (
            <View
              key={item.id}
              className="flex-row items-center justify-between rounded-2xl bg-white px-4 py-4"
              style={{
                shadowColor: "#0D132B",
                shadowOpacity: 0.04,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              }}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: item.color }}
                >
                  <Ionicons name={item.icon} size={22} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-body-lg text-text-primary">
                    {item.title}
                  </Text>
                  <Text className="text-body-sm text-text-secondary">
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              {item.completed ? (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-lingua-purple">
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
              ) : (
                <View className="h-7 w-7 rounded-full border border-border" />
              )}
            </View>
          ))}
        </View>

        <View
          className="mt-6 flex-row items-center justify-between rounded-3xl px-5 py-4"
          style={{ backgroundColor: "#F3FAE8" }}
        >
          <View>
            <Text className="text-body-sm text-text-secondary">Next up</Text>
            <Text className="mt-1 text-h4 text-text-primary">
              AI Video Call
            </Text>
            <Text className="text-body-sm text-text-secondary">
              Practice speaking
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <Image
              source={avatarImage}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              contentFit="cover"
            />
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-lingua-green">
              <Ionicons name="videocam" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

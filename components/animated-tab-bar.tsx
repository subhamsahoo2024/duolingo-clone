import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 74;
const ACTIVE_CIRCLE_SIZE = 44;

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  learn: "book-outline",
  "ai-teacher": "sparkles-outline",
  chat: "chatbubble-ellipses-outline",
  profile: "person-outline",
};

export function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [tabLayouts, setTabLayouts] = useState<number[]>([]);
  const indicatorX = useSharedValue(0);

  const activeIndex = state.index;

  useEffect(() => {
    if (!tabLayouts[activeIndex]) {
      return;
    }

    // Centers the sliding background circle horizontally over the active tab
    const nextX = tabLayouts[activeIndex] - ACTIVE_CIRCLE_SIZE / 2;
    indicatorX.value = withTiming(nextX, { duration: 240 });
  }, [activeIndex, tabLayouts]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const center = x + width / 2;

    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = center;
      return next;
    });
  };

  // Dynamically calculate bottom padding based on device safe area
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View
      style={[
        styles.container,
        {
          height: TAB_BAR_HEIGHT + bottomPadding,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      {/* Moving background circle */}
      {tabLayouts.length > 0 && (
        <Animated.View
          style={[styles.activeCircle, indicatorStyle]}
          pointerEvents="none"
        />
      )}

      {/* Stationary items layer */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = iconMap[route.name] ?? "ellipse-outline";

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            onLayout={handleLayout(index)}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          >
            {/* Stationary container perfectly sized to match the sliding circle */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={22}
                color={isFocused ? "#FFFFFF" : "#6B7280"}
              />
            </View>
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Fixed the 'justify' typo here
    paddingTop: 10, // Dictates the strict starting Y coordinate for icons
    height: TAB_BAR_HEIGHT,
  },
  iconContainer: {
    width: ACTIVE_CIRCLE_SIZE,
    height: ACTIVE_CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center", // Centers the icon perfectly inside its container
  },
  activeCircle: {
    position: "absolute",
    width: ACTIVE_CIRCLE_SIZE,
    height: ACTIVE_CIRCLE_SIZE,
    borderRadius: ACTIVE_CIRCLE_SIZE / 2,
    backgroundColor: "#6C4EF5",
    top: 10, // Matches the tabButton paddingTop exactly for seamless alignment
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    color: "#6B7280",
    fontFamily: "Poppins-Medium",
  },
  activeLabel: {
    color: "#6C4EF5",
  },
});

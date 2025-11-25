import React, { useEffect } from "react";
import { View, Text, ScrollView, TextInput, Dimensions } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const { width: SCREEN_W } = Dimensions.get("window");

type Slice = {
  percentage: number;
  color: string;
  label: string;
};

const slices: Slice[] = [
  { percentage: 45, color: "#00BFFF", label: "Food" },
  { percentage: 25, color: "#2DD4BF", label: "Transport" },
  { percentage: 30, color: "#87CEEB", label: "Subscriptions" },
];

export default function Insights() {
  // Animation shared values
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    float1.value = withRepeat(
      withTiming(-12, { duration: 4500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    float2.value = withRepeat(
      withTiming(-8, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    pulse.value = withRepeat(
      withTiming(1.08, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const float1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value }],
  }));

  const float2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View className="flex-1 bg-gradient-to-b from-[#E6F7FF] to-white dark:from-[#0A2342] dark:to-background-dark">
      {/* Floating ambient blobs */}
      <Animated.View
        style={float1Style}
        className="absolute left-10 top-1/4 w-48 h-48 rounded-full bg-sky-blue/20 dark:bg-sky-blue/10"
      />
      <Animated.View
        style={float2Style}
        className="absolute right-10 top-1/2 w-32 h-32 rounded-full bg-primary/20 dark:bg-primary/10"
      />

      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {/* Header */}
        <View className="pt-8 pb-4">
          <Text className="text-soft-navy dark:text-white text-2xl font-poppins font-semibold border-b-2 border-primary w-1/2">
            AI Insights
          </Text>
          <Text className="text-gray-blue text-sm mt-1">
            Smarter Spending Decisions with AI
          </Text>
        </View>

        {/* AI Summary */}
        <BlurView
          intensity={50}
          className="m-4 p-4 rounded-2xl flex-row items-center bg-white/25 border border-sky-blue/20 dark:border-neon-blue/20"
        >
          <Animated.View
            style={pulseStyle}
            className="w-14 h-14 rounded-full bg-sky-blue/20 flex items-center justify-center"
          >
            <Text className="text-primary text-2xl">🤖</Text>
          </Animated.View>

          <View className="ml-4 flex-1">
            <Text className="text-soft-navy dark:text-white text-base font-semibold">
              Great job, Alex! You saved{" "}
              <Text className="font-bold text-primary">₦20,000</Text> this month.
            </Text>
            <Text className="text-gray-blue text-sm mt-1">
              Your spending dropped 15% compared to last month.
            </Text>
          </View>
        </BlurView>

        {/* CHARTS SECTION */}
        <View className="flex-row justify-between gap-4">
          {/* Donut Chart */}
          <BlurView
            intensity={40}
            className="flex-1 p-4 rounded-2xl items-center bg-white/25"
          >
            <Text className="text-soft-navy dark:text-white font-medium mb-2">
              Spending Breakdown
            </Text>

            <View className="relative items-center justify-center h-40 w-40">
              <Svg width={160} height={160} viewBox="0 0 36 36">
                {slices.map((slice, i) => {
                  const startAngle = slices
                    .slice(0, i)
                    .reduce((sum, s) => sum + s.percentage, 0);

                  const circumference = 2 * Math.PI * 15.9155;

                  return (
                    <Path
                      key={slice.label}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                      stroke={slice.color}
                      strokeWidth={3}
                      strokeDasharray={`${(circumference * slice.percentage) / 100}, ${circumference}`}
                      fill="none"
                      transform={`rotate(${(startAngle / 100) * 360} 18 18)`}
                    />
                  );
                })}
              </Svg>

              <View className="absolute items-center">
                <Text className="text-soft-navy dark:text-white text-3xl font-bold">
                  ₦245,000
                </Text>
                <Text className="text-gray-blue text-sm">Total</Text>
              </View>
            </View>

            {/* Legend */}
            <View className="flex-row gap-2 justify-center flex-wrap mt-2">
              {slices.map((s) => (
                <View
                  key={s.label}
                  className="flex flex-row items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full"
                >
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <Text className="text-soft-navy dark:text-gray-300 text-sm font-medium">
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          </BlurView>

          {/* Monthly Line Trend */}
          <BlurView
            intensity={40}
            className="flex-1 p-4 rounded-2xl bg-white/25"
          >
            <Text className="text-soft-navy dark:text-white font-medium mb-2">
              Monthly Trends
            </Text>

            <View className="relative h-32">
              <Svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 130"
              >
                <Defs>
                  <LinearGradient id="line-glow-gradient" x1="0" y1="0" x2="400" y2="0">
                    <Stop offset="0" stopColor="#87CEEB" />
                    <Stop offset="1" stopColor="#00BFFF" />
                  </LinearGradient>
                </Defs>

                <Path
                  d="M0 80 C40 10, 80 40, 120 70 S200 110, 240 80 S320 0, 360 40"
                  stroke="url(#line-glow-gradient)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  fill="none"
                />
                <Circle cx="360" cy="40" r={4} fill="#00BFFF" />
                <Circle cx="400" cy="65" r={5} fill="#00BFFF" />
              </Svg>

              <View className="flex-row justify-between mt-32 px-2">
                {["Jan", "Mar", "May", "Jul", "Sep", "Oct"].map((m) => (
                  <Text key={m} className="text-gray-blue text-xs font-medium">
                    {m}
                  </Text>
                ))}
              </View>
            </View>
          </BlurView>
        </View>

        {/* AI Recommendations */}
        <View className="flex flex-col gap-4 mt-4 pb-20">
          <Text className="text-soft-navy dark:text-white font-semibold text-base">
            Smart AI Recommendations
          </Text>

          <View className="flex-row items-center gap-4 p-4 glassmorphic rounded-xl">
            <View className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <Text className="material-symbols-outlined text-primary text-xl">
                lightbulb
              </Text>
            </View>
            <Text className="text-soft-navy dark:text-gray-200 text-sm">
              Consider reducing subscriptions — they make up 18% of your monthly
              spend.
            </Text>
          </View>

          <View className="flex-row items-center gap-4 p-4 glassmorphic rounded-xl">
            <View className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <Text className="material-symbols-outlined text-primary text-xl">
                restaurant
              </Text>
            </View>
            <Text className="text-soft-navy dark:text-gray-200 text-sm">
              You've spent 25% more on dining out this week. Try a home-cooked
              meal!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Chat Bar (kept as requested) */}
      <View className="absolute bottom-4 left-4 right-4">
        <View className="flex-row items-center gap-3 h-14 p-2 px-4 glassmorphic rounded-full shadow-lg shadow-sky-blue/20">
          <Text className="material-symbols-outlined text-primary animate-pulse">
            spark
          </Text>

          <TextInput
            className="flex-1 bg-transparent text-soft-navy dark:text-white placeholder-gray-blue text-sm"
            placeholder="Ask AI: How can I save more this week?"
          />

          <Text className="material-symbols-outlined text-sky-blue">mic</Text>
        </View>
      </View>
    </View>
  );
}

import React, { useRef, useEffect } from "react";
import { View, Text, Image, Pressable, Animated, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import images from "@/constants/images";

if (Platform.OS === "web" && typeof setImmediate === "undefined") {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

const OnboardingScreen3 = () => {
  const slideAnim = useRef(new Animated.Value(-200)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 250,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -200,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleContinue = () => {
    router.push("/(auth)/signup");
  };

  return (
    <View className="flex-1 relative bg-[#F9FAFB] dark:bg-[#0A192F]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Background elements */}
        <View className="absolute -top-[15%] -right-[15%] w-80 h-80 rounded-full bg-[#00BFFF]/10 blur-3xl" />
        <View className="absolute -bottom-[15%] -left-[15%] w-80 h-80 rounded-full bg-[#00BFFF]/10 blur-3xl" />
        <View className="absolute top-[15%] left-[5%] w-60 h-48 rounded-3xl bg-white/10 blur-2xl border border-white/20 -rotate-12" />
        <View className="absolute bottom-[25%] right-[5%] w-40 h-40 rounded-full bg-white/10 blur-2xl border border-white/20" />

        {/* Header (Icon only now) */}
        <View className="flex-row items-center justify-center w-full mt-10">
          <View className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 border border-white/20 shadow-[0_0_30px_rgba(0,191,255,0.4)]">
            <MaterialIcons name="smart-toy" size={28} color="#00BFFF" />
          </View>
        </View>

        {/* Illustration */}
        <View className="w-full items-center my-8">
          <Image
            source={images.os3}
            resizeMode="contain"
            className="w-64 h-64"
          />
        </View>

        {/* Text Content */}
        <View className="items-center px-4">
          <Text className="font-bold text-[28px] text-[#0A2342] text-center leading-tight font-poppins">
            Your Spending. Simplified with AI.
          </Text>
          <Text className="mt-3 text-base text-[#6B7C93] text-center max-w-xs leading-relaxed">
            Get personalized reports, smart alerts, and total control of your finances.
          </Text>
        </View>

        {/* Continue Button */}
        <View className="w-full flex items-center justify-center px-6 mt-6">
          <Pressable
            onPress={handleContinue}
            className="relative flex items-center justify-center w-64 h-14 px-5 rounded-full overflow-hidden shadow-lg shadow-[#00BFFF]/20"
          >
            {/* Background gradient */}
            <View className="absolute inset-0 bg-gradient-to-r from-[#A8E4FF] to-[#00BFFF] opacity-20" />

            {/* Glassmorphism border */}
            <View
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderImage: "linear-gradient(to right, #A8E4FF, #00BFFF) 1",
              }}
            />

            {/* Animated light streak */}
            <Animated.View
              className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-10 skew-x-[-20deg]"
              style={{
                transform: [{ translateX: slideAnim }],
              }}
            />

            {/* Button text */}
            <Text className="relative z-10  text-gray-700 font-bold text-base tracking-wide">
              Continue
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardingScreen3;

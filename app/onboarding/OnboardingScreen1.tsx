// OnboardingScreen1.jsx
import React, { useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import images from "@/constants/images";

// 🧩 Fix for "setImmediate is not defined" (on Web)
if (Platform.OS === "web" && typeof setImmediate === "undefined") {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

const OnboardingScreen1 = ({ onNext }) => {
  const router = useRouter();

  // Animations
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // for Skip button fade-in

  useEffect(() => {
    // Button light streak animation
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 250,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -250,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();

    // Skip button fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: 600,
      useNativeDriver: true,
    }).start();

    return () => loop.stop();
  }, []);

  return (
    <View className="flex-1 relative bg-[#F9FAFB] dark:bg-[#0A192F]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Background blobs */}
        <View className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-50 bg-[#A8E4FF]/60 blur-3xl" />
        <View className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#00BFFF]/20 blur-3xl" />
        <View className="absolute top-20 right-5 w-20 h-20 rounded-full bg-[#A8E4FF]/40 blur-2xl" />
        <View className="absolute bottom-1/3 left-5 w-16 h-16 rounded-full bg-[#A8E4FF]/50 blur-2xl" />

        {/* Glass cards */}
        <View className="absolute top-16 left-5 w-40 h-60 rounded-3xl bg-white/40 border border-white/20 -rotate-12 backdrop-blur-2xl" />
        <View className="absolute bottom-20 right-5 w-48 h-56 rounded-3xl bg-white/40 border border-white/20 rotate-12 backdrop-blur-2xl" />

        {/* Header with Skip */}
        <View className="flex-row items-center justify-between w-full px-6 mt-10">
          <View className="flex-1" />
          <View className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 border border-white/20 shadow-[0_0_30px_rgba(0,191,255,0.4)]">
            <Icon name="account-balance-wallet" size={28} color="#00BFFF" />
          </View>

          <View className="flex-1 items-end">
            <Animated.View style={{ opacity: fadeAnim }}>
              <Pressable onPress={() => router.push("/signup")}>
                <Text className="text-[#00BFFF] text-sm font-semibold opacity-80">
                  Skip
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>

        {/* Content */}
        <View className="flex-1 p-6 justify-center items-center z-10 mt-8">
          {/* Illustration */}
          <Image
            source={images.os1}
            className="w-80 h-80 mb-8"
            resizeMode="contain"
          />

          {/* Text */}
          <Text className="font-bold text-[#0A192F] dark:text-white text-[28px] text-center mb-3">
            Track Your Expenses Smarter with AI.
          </Text>
          <Text className="text-[#6B7C93] dark:text-slate-300 text-base text-center mb-12 px-4">
            Manage your spending, set budgets, and gain insights effortlessly.
          </Text>

          {/* Button Wrapper */}
          <View className="w-full flex items-center justify-center px-6 mt-6">
            <Pressable
              onPress={onNext}
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
              <Text className="relative z-10 text-gray-700 font-bold text-base tracking-wide">
                Get Started
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardingScreen1;

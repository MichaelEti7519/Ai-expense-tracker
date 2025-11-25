import React, { useRef, useEffect } from "react";
import { View, Text, Image, Animated, Pressable, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import images from "@/constants/images";

if (Platform.OS === "web" && typeof setImmediate === "undefined") {
  global.setImmediate = (fn) => setTimeout(fn, 0);
}

const OnboardingScreen2 = ({ onNext }) => {
  const slideAnim = useRef(new Animated.Value(-250)).current;

  // Animate the light streak
  useEffect(() => {
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
    return () => loop.stop();
  }, []);

  return (
    <View className="relative bg-[#F9FAFB] dark:bg-[#0A192F]  flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* === Background Gradients === */}
        <View className="absolute top-[-10%] left-[-15%] w-72 h-72 bg-gradient-to-br from-[#A8E4FF] to-[#00BFFF]/30 rounded-full opacity-40 blur-3xl" />
        <View className="absolute bottom-[-15%] right-[-10%] w-80 h-80 bg-gradient-to-tl from-[#A8E4FF] to-[#00BFFF]/50 rounded-full opacity-30 blur-3xl" />
        <View className="absolute top-[20%] right-[5%] w-40 h-40 bg-white/20 rounded-xl rotate-[-12deg] opacity-50 border border-white/30" />
        <View className="absolute bottom-[30%] left-[5%] w-32 h-32 bg-white/20 rounded-full rotate-12 opacity-50 border border-white/30" />

        {/* === Header === */}
        <View className="items-center pt-8">
          <View className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/20 border border-white/30 shadow-lg shadow-[#00BFFF]/20 backdrop-blur-2xl">
            <MaterialIcons name="bar-chart" size={36} color="#00BFFF" style={{ opacity: 0.8 }} />
          </View>
          <Text className="text-[#00BFFF] text-sm font-medium">Smart Spending Starts Here.</Text>
        </View>

        {/* === Illustration === */}
        <View className="w-full items-center my-8">
  <View className="w-[90%] max-w-sm items-center justify-center">
    <Image
      className="w-[100%] h-64"
      resizeMode="contain"
      source={images.os2}
    />
  </View>
</View>


        {/* === Text Content === */}
        <View className="items-center px-4">
          <Text className="font-heading font-bold text-[28px] leading-tight text-[#001F3F] text-center tracking-tight">
            Track and Analyze Your Spending.
          </Text>
          <Text className="mt-3 text-base text-[#6B7C93] text-center max-w-xs leading-relaxed">
            Visualize your expenses in real time and see where your money goes.
          </Text>
        </View>

        {/* === Button === */}
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
    <Text className="relative z-10  text-gray-700 font-bold text-base tracking-wide">
      Next
    </Text>
  </Pressable>
</View>


          {/* === Pagination Dots === */}
          
        
      </ScrollView>
    </View>
  );
};

export default OnboardingScreen2;

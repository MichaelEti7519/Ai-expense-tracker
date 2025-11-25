import React, { useRef, useState, useEffect } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import OnboardingScreen1 from "./OnboardingScreen1";
import OnboardingScreen2 from "./OnboardingScreen2";
import OnboardingScreen3 from "./OnboardingScreen3";

const { width } = Dimensions.get("window");

const OnboardingSwiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current; // pulsing glow
  const swiperRef = useRef(null);

  const screens = [
    <OnboardingScreen1 onNext={() => swiperRef.current.scrollBy(1)} />,
    <OnboardingScreen2 onNext={() => swiperRef.current.scrollBy(1)} />,
    <OnboardingScreen3 />,
  ];

  // Pulse animation for active dot
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-[#0f1e23]">
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => setActiveIndex(index)}
        showsPagination={false}
        scrollEnabled
        onScroll={(e) => scrollX.setValue(e.nativeEvent.contentOffset.x / width)}
        scrollEventThrottle={16}
      >
        {screens.map((screen, i) => (
          <View key={i} className="flex-1">
            {screen}
          </View>
        ))}
      </Swiper>

      {/* Circular Glass Dots with Pulsing Glow */}
      <View className="absolute bottom-8 left-0 right-0 flex-row justify-center items-center space-x-4">
        {screens.map((_, i) => {
          const scale = scrollX.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          const isActive = activeIndex === i;
          const glow = glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  transform: [{ scale }],
                  opacity,
                  shadowOpacity: isActive ? glow : 0,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(0,191,255,0.3)",
    shadowColor: "#00BFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
});

export default OnboardingSwiper;

import { Tabs } from "expo-router";
import { View, Text, Animated, Image, Platform, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef, useEffect } from "react";
import icons from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  const liftAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(liftAnim, {
        toValue: focused ? -4 : 0, // reduce lift
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: focused ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.05 : 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.05 : 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{ translateY: liftAnim }, { scale: scaleAnim }],
          alignItems: "center",
          justifyContent: "center",
          width: 70,
        }}
      >
        {/* Glow behind icon */}
        {focused && (
          <Animated.View
            style={{
              position: "absolute",
              top: -2,
              width: 50,
              height: 28,
              borderRadius: 25,
              backgroundColor: "#00BFFF",
              opacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.12] }),
              shadowColor: "#00BFFF",
              shadowOpacity: 0.25,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        )}

        <Image
          source={icon}
          style={{
            width: 26,
            height: 26,
            tintColor: focused ? "#00BFFF" : "#94A3B8",
          }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 11,
            fontWeight: focused ? "600" : "400",
            color: focused ? "#00BFFF" : "#94A3B8",
            marginTop: 4,
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom ? insets.bottom + 8 : 12,
          left: 16,
          right: 16,
          height: 70,
          backgroundColor: "rgba(255,255,255,0.25)",
          borderRadius: 36,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          shadowColor: "#00BFFF",
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 8,
          overflow: "hidden",
          ...(Platform.OS === "web" && { backdropFilter: "blur(12px)" }),
        },
      }}
    >
      <Tabs.Screen name="Home" options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" /> }} />
      <Tabs.Screen name="Transactions" options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.transcat} title="Activity" /> }} />
      <Tabs.Screen name="Insights" options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.insights} title="Insights" /> }} />
      <Tabs.Screen name="Profile" options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.profile} title="Profile" /> }} />
    </Tabs>
  );
};

export default TabsLayout;

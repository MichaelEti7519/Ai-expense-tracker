import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Tx = {
  label: string;
  subtitle?: string;
  amount: string;
  date: string;
  icon: string;
};

const SAMPLE_TX: Tx[] = [
  { label: "Salary", amount: "₦+ 150,000", date: "Oct 28, 09:00 AM", icon: "wallet" },
  { label: "Lunch at Cafeteria", amount: "₦- 1,200", date: "Oct 28, 12:30 PM", icon: "lunch-dining" },
  { label: "Bus fare to work", amount: "₦- 500", date: "Oct 28, 08:15 AM", icon: "directions-bus" },
  { label: "Netflix Subscription", amount: "₦- 4,500", date: "Oct 27, 06:00 PM", icon: "subscriptions" },
  { label: "Groceries", amount: "₦- 8,750", date: "Oct 26, 05:45 PM", icon: "shopping_cart" },
];

const FILTERS = ["All", "Income", "Expenses", "Subscriptions", "AI Tips"] as const;

export default function TransactionsTab() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [filter, setFilter] = useState<typeof FILTERS[number]>("All");

  // Animation for glow
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0, duration: 800, useNativeDriver: false }),
      ])
    ).start();
  }, [glowAnim]);

  const handleSelectFilter = (f: typeof FILTERS[number], index: number) => {
    setFilter(f);
    scrollRef.current?.scrollTo({ x: index * 100 - 16, animated: true });
  };

  // Interpolate the glow to opacity
  const glowStyle = {
    shadowColor: "#0db9f2",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [4, 12] }),
    shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.6] }),
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Top App Bar */}
        <View className="sticky top-0 z-10 glassmorphism pt-4">
          <View className="flex-row items-center justify-between p-4 pb-2">
            <TouchableOpacity
              className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/20 items-center justify-center"
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color={Platform.OS === "web" ? "#0f172a" : "#0f172a"} />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-center flex-1 text-slate-900 dark:text-white">Transactions</Text>

            <TouchableOpacity className="w-12 h-12 rounded-full bg-white/50 dark:bg-black/20 items-center justify-center">
              <MaterialIcons name="tune" size={24} color={Platform.OS === "web" ? "#0f172a" : "#0f172a"} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="px-4 py-3">
            <View className="flex-row items-center rounded-full h-14 glassmorphism shadow-glass px-2">
              <MaterialIcons name="search" size={22} color="#60808a" style={{ marginHorizontal: 8 }} />
              <TextInput
                placeholder="Search transactions…"
                placeholderTextColor="#60808a"
                className="flex-1 text-base text-slate-900 dark:text-white"
              />
              <MaterialIcons name="mic" size={22} color="#60808a" style={{ marginHorizontal: 8 }} />
            </View>
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            className="px-3 pb-3"
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {FILTERS.map((c, index) => {
              const active = filter === c;
              return (
                <Animated.View
                  key={c}
                  style={active ? glowStyle : {}}
                  className="mr-3"
                >
                  <TouchableOpacity
                    onPress={() => handleSelectFilter(c, index)}
                    className={`h-10 px-5 flex items-center justify-center rounded-full ${
                      active ? "bg-[#0db9f2]" : "glassmorphism"
                    }`}
                  >
                    <Text
                      className={`${active ? "text-white font-semibold" : "text-slate-700 dark:text-gray-200 font-medium"} text-sm`}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>

        {/* AI Insight */}
        <View className="flex-row items-start gap-3 rounded-lg p-3 glassmorphism shadow-glass mx-4 mb-3">
          <MaterialIcons name="auto-awesome" size={20} color="#0db9f2" style={{ marginTop: 4 }} />
          <Text className="text-slate-700 dark:text-gray-200 text-sm font-medium leading-snug">
            Your transport expenses rose 22% this week. Try budgeting ₦3,000 daily.
          </Text>
        </View>

        {/* Transaction List */}
        {SAMPLE_TX.filter(tx => {
          if (filter === "All") return true;
          if (filter === "Income") return tx.amount.startsWith("₦+");
          if (filter === "Expenses") return tx.amount.startsWith("₦-");
          if (filter === "Subscriptions") return tx.icon === "subscriptions";
          return true;
        }).map((tx, i) => (
          <View
            key={i}
            className="flex-row items-center gap-4 justify-between rounded-lg p-3 glassmorphism shadow-glass mx-4 mb-3"
          >
            <View className="flex-row items-center gap-4">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(13,185,242,0.2)" }}
              >
                <MaterialIcons name={tx.icon as any} size={24} color="#0db9f2" />
              </View>
              <View className="flex-col justify-center">
                <Text className="text-base font-semibold text-slate-900 dark:text-white">{tx.label}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</Text>
              </View>
            </View>
            <Text className={`${tx.amount.startsWith("₦-") ? "text-red-500" : "text-green-500"} text-base font-semibold`}>
              {tx.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-24 right-6">
        <TouchableOpacity
          className="h-16 w-16 rounded-full bg-[#0db9f2] items-center justify-center shadow-lg shadow-primary/40"
          onPress={() => router.push("/screen/income")}
        >
          <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

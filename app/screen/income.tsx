import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

const { height: screenHeight } = Dimensions.get("window");

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AddTransactionModal({ visible, onClose }: Props) {
  const [type, setType] = useState<"Income" | "Expense">("Expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("October 26, 2023");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const pickerItems = ["Food", "Transport", "Shopping", "Bills", "Other"];

  const translateY = useSharedValue(screenHeight);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : screenHeight, {
      duration: 300,
      easing: Easing.out(Easing.linear),
    });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <BlurView intensity={80} tint="light" className="absolute inset-0">
      <Animated.View
        style={[
          animatedStyle,
          { position: "absolute", bottom: 0, width: "100%", maxHeight: screenHeight * 0.9 },
        ]}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View className="mx-4 mb-2 bg-white/25 dark:bg-gray-900/25 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 p-4">
            
            {/* Handle */}
            <View className="h-1 w-12 bg-white/40 rounded-full self-center mb-4" />

            {/* Header */}
            <View className="relative items-center justify-center mb-4">
              <Text className="text-[#1E3A8A] dark:text-[#B0E0E6] text-[22px] font-semibold text-center">
                Add Transaction
              </Text>
              <TouchableOpacity onPress={onClose} className="absolute right-4 top-2 p-2">
                <MaterialIcons name="close" size={28} color="#1E3A8A" />
              </TouchableOpacity>
            </View>

            {/* Type Selector */}
            <View className="flex-row bg-black/10 dark:bg-white/10 rounded-full p-1 shadow-inner mb-4">
              {["Income", "Expense"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setType(item as any)}
                  className={`flex-1 items-center justify-center rounded-full py-2 ${
                    type === item ? "bg-[#87CEEB]/50 shadow-lg" : ""
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      type === item
                        ? "text-[#1E3A8A] dark:text-white"
                        : "text-[#1E3A8A]/70 dark:text-[#B0E0E6]/70"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Title Input */}
            <View className="relative mb-4">
              <MaterialIcons name="receipt-long" size={24} color="#1E3A8A" className="absolute left-4 top-4" />
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="What’s this transaction for?"
                placeholderTextColor="#6B7C93"
                className="pl-12 pr-4 h-14 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-600 text-[#1E3A8A] dark:text-white"
              />
            </View>

            {/* Amount Input */}
            <View className="relative mb-4">
              <Text className="absolute left-4 top-4 text-xl font-semibold text-[#1E3A8A] dark:text-[#B0E0E6]">₦</Text>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                placeholderTextColor="#6B7C93"
                keyboardType="numeric"
                className="pl-10 pr-4 h-14 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-600 text-xl font-semibold text-[#1E3A8A] dark:text-white"
              />
            </View>

            {/* Category Dropdown */}
            <View className="relative mb-4">
              <MaterialIcons name="category" size={24} color="#1E3A8A" className="absolute left-4 top-4 z-10" />
              <TouchableOpacity
                onPress={() => setCategoryOpen(!categoryOpen)}
                className="border border-white/30 dark:border-gray-600 rounded-full bg-white/20 dark:bg-black/20 h-14 justify-center px-4"
              >
                <Text className="text-[#1E3A8A] dark:text-white">
                  {category || "Select Category"}
                </Text>
              </TouchableOpacity>
              {categoryOpen && (
                <View className="absolute mt-16 w-full bg-white/90 dark:bg-gray-800 rounded-xl border border-white/30 dark:border-gray-600 z-50">
                  {pickerItems.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => {
                        setCategory(item);
                        setCategoryOpen(false);
                      }}
                      className="px-4 py-3 border-b border-white/20 dark:border-gray-600"
                    >
                      <Text className="text-[#1E3A8A] dark:text-white">{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Date Input */}
            <View className="relative mb-4">
              <MaterialIcons name="calendar-month" size={24} color="#1E3A8A" className="absolute left-4 top-4" />
              <TextInput
                value={date}
                onChangeText={setDate}
                className="pl-12 pr-4 h-14 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-600 text-[#1E3A8A] dark:text-white"
              />
            </View>

            {/* AI Suggestion */}
            <View className="flex-row items-center gap-2 bg-black/10 dark:bg-white/10 p-3 rounded-lg mb-4 shadow-inner">
              <Text className="text-xl">🤖</Text>
              <Text className="text-[#6B7C93] dark:text-gray-300 text-sm italic">
                Suggestion: Based on your past spending, this looks like a Food expense.
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex flex-col items-center gap-4 pt-2 pb-4">
              <TouchableOpacity className="h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#A8E4FF] to-[#00BFFF] text-white font-bold shadow-lg active:scale-95">
                <Text className="text-base font-bold text-white">Save Transaction</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-white/80 dark:text-white/60 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Animated.View>
    </BlurView>
  );
}

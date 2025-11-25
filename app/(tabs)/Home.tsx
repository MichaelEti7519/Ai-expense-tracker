import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, {
  Path,
  Defs,
  LinearGradient as SVGLinearGradient,
  Stop,
  Rect,
  Mask,
} from "react-native-svg";
import AddTransactionModal from "../screen/income";

/* ---------------------------------
   REPLACEMENT: Custom SVG Gradient
----------------------------------- */

function GradientText({ text, style = {} }) {
  return (
    <View style={{ position: "relative" }}>
      <Svg height={40} width="100%">
        <Defs>
          <SVGLinearGradient id="textGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#0db9f2" />
            <Stop offset="1" stopColor="#0077b6" />
          </SVGLinearGradient>

          <Mask id="textMask">
            <Text
              fill="white"
              x="0"
              y="30"
              fontSize={34}
              fontWeight="700"
              {...style}
            >
              {text}
            </Text>
          </Mask>
        </Defs>

        <Rect width="100%" height="40" fill="url(#textGradient)" mask="url(#textMask)" />
      </Svg>
    </View>
  );
}

/* ---------------------------------
   Chart Path
----------------------------------- */

const chartPath =
  "M0 70 C18 70 18 21 36 21 C54 21 54 41 72 41 C90 41 90 63 108 63 C126 63 126 33 144 33 C162 33 162 71 180 71 C198 71 198 51 216 51 C234 51 234 45 252 45 C270 45 270 81 288 81 C306 81 306 99 324 99 C342 99 342 1 360 1 C378 1 378 51 396 51 C414 51 414 89 432 89 C450 89 450 25 470 25";

/* ---------------------------------
   Dummy Transactions
----------------------------------- */

const transactions = [
  { label: "Food", amount: "-₦3,500", subtitle: "The Food Place", date: "Oct 26", icon: "restaurant" },
  { label: "Bills", amount: "-₦10,000", subtitle: "Data Subscription", date: "Oct 25", icon: "receipt-long" },
  { label: "Shopping", amount: "-₦15,200", subtitle: "Online Store", date: "Oct 24", icon: "shopping-bag" },
  { label: "Transport", amount: "-₦1,250", subtitle: "City Transit", date: "Oct 23", icon: "directions-bus" },
];

export default function Home() {
  const router = useRouter();
  const [showSheet, setShowSheet] = useState(false);

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="px-4 pt-6 pb-40">

        {/* Top App Bar */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-primary text-xl font-bold">PayMe AI</Text>
          <BlurView intensity={40} tint="light" className="rounded-full w-10 h-10 overflow-hidden">
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoCivsPTg2FrGjWWB2KS-_t5w1YyBPdaxHZQlA_dBxOqX6G7lDuWuKB0SM-iSaM00BpZHiSDHVC1mcSiHlMxMfZvsMH6uIE7ZlbOxDbJPOb9o-QJPQihkhg10p_BX5143Nf5PdzDNvnqL7EhJmQNnVYAtjLPMrAGiCOGb5-FLLY0zfWaPI8w9moTd9Jv4NR1oKFcI-faL7OLl9yGRsKBub5RwaHtVfqeMibfO10hN8vD5n1DL8GmmITq6BobliNseXJBAuXPIf_sbZ",
              }}
              className="w-full h-full rounded-full"
            />
          </BlurView>
        </View>

        {/* Headline */}
        <Text className="text-slate-900 dark:text-white text-[28px] font-bold pb-1">
          Welcome back, Alex 👋
        </Text>
        <Text className="text-slate-600 dark:text-slate-400 text-base pb-4">
          Here’s your spending summary.
        </Text>

        {/* Total Balance Card */}
        <BlurView intensity={40} tint="light" className="rounded-xl p-6 mb-4 shadow-glass">
          <Text className="text-slate-600 dark:text-slate-400 font-bold text-2xl mb-1">Total Balance</Text>

          <GradientText text="₦120,540.00" />

          <TouchableOpacity
            onPress={() => setShowSheet(true)}
            className="bg-[#0db9f2] h-10 rounded-full justify-center items-center mt-3"
          >
            <Text className="text-white font-medium">+ Add Income</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Expense Overview */}
        <BlurView intensity={40} tint="light" className="rounded-xl p-6 mb-4 shadow-glass">
          <Text className="text-slate-800 dark:text-slate-200 text-base font-medium mb-1">
            This Month’s Spending
          </Text>
          <Text className="text-red-500 dark:text-red-400 text-base font-medium mb-3">
            ↓ 8% from last month
          </Text>

          <View style={{ width: "100%", height: 100 }}>
            <Svg width="100%" height="100%" viewBox="0 0 470 102">
              <Defs>
                <SVGLinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#0db9f2" stopOpacity={0.3} />
                  <Stop offset="100%" stopColor="#0db9f2" stopOpacity={0} />
                </SVGLinearGradient>
              </Defs>

              <Path d={chartPath} stroke="#0db9f2" strokeWidth={3} fill="none" />
              <Path d={`${chartPath} V102 H0 Z`} fill="url(#chartGradient)" />
            </Svg>
          </View>
        </BlurView>

        {/* Smart Insights */}
        <BlurView intensity={40} tint="light" className="rounded-xl p-6 mb-6 shadow-glass">
          <Text className="text-slate-800 dark:text-slate-200 text-lg font-bold mb-1">Smart Insights 🤖</Text>
          <Text className="text-slate-600 dark:text-slate-400 mb-3">
            Your spending on dining increased by 15% this week. Would you like to set a limit?
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-[#0db9f2] h-10 rounded-full justify-center items-center">
              <Text className="text-white font-medium">Yes, set limit</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 border border-[#0db9f2] h-10 rounded-full justify-center items-center">
              <Text className="text-[#0db9f2] font-medium">Ignore</Text>
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Recent Transactions */}
        <Text className="text-slate-900 dark:text-white text-lg font-bold mb-3">
          Recent Transactions
        </Text>

        {transactions.map((t, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => router.push("/(tabs)/Transactions")}
            className="flex-row items-center p-3 rounded-lg mb-2 bg-white dark:bg-[#0f2a2f]"
          >
            <View className="w-12 h-12 rounded-full bg-[#0db9f2]/10 justify-center items-center mr-4">
              <MaterialIcons name={t.icon} size={22} color="#0db9f2" />
            </View>

            <View className="flex-1">
              <Text className="text-slate-800 dark:text-slate-200 font-medium">{t.label}</Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</Text>
            </View>

            <View className="items-end">
              <Text className="text-slate-800 dark:text-slate-200 font-medium">{t.amount}</Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">{t.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <AddTransactionModal visible={showSheet} onClose={() => setShowSheet(false)} />
    </View>
  );
}

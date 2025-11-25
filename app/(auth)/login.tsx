import { Account } from "appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import appwriteClient from "../../lib/appwrite";

export default function LoginScreen() {
  const router = useRouter();
  const account = new Account(appwriteClient);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await account.createSession(email, password);
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      alert(error.message || "Login failed.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-sky-300 to-sky-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="h-20 w-20 rounded-full bg-sky-300/30 items-center justify-center shadow-lg mb-6">
            <Icon name="lock" size={40} color="#00BFFF" />
          </View>

          {/* Headline */}
          <Text className="text-[#0f1e23] text-3xl font-bold text-center">
            Welcome Back
          </Text>
          <Text className="text-gray-700/80 text-base text-center mt-2 mb-6">
            Login to continue to your smart money dashboard.
          </Text>

          {/* Form Container */}
          <View className="w-full max-w-md bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg backdrop-blur-md">
            {/* Email */}
            <View className="mb-4">
              <Text className="text-[#101618] font-medium mb-2">
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-white/50 bg-white/50 rounded-xl px-4 py-3 text-[#101618]"
                placeholderTextColor="#5e818d"
              />
            </View>

            {/* Password */}
            <View>
              <Text className="text-[#101618] font-medium mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="border border-white/50 bg-white/50 rounded-xl px-4 py-3 pr-12 text-[#101618]"
                  placeholderTextColor="#5e818d"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={22}
                    color="#5e818d"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="h-14 w-full mt-6 items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 shadow-lg active:scale-95"
            >
              <Text className="text-white font-semibold text-base">
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Signup Link */}
          <Text className="text-base text-gray-700/90 mt-6">
            Don’t have an account?{" "}
            <Text
              onPress={() => router.push("/(tabs)/Home")}
              className="text-[#00BFFF] font-semibold underline"
            >
              Sign Up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

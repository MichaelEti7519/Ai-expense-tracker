import { Account, ID } from "appwrite";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
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

export default function SignupScreen() {
  const router = useRouter();
  const account = new Account(appwriteClient);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { label: "", color: "" };
    if (password.length < 6) return { label: "Weak", color: "#ef4444" };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password))
      return { label: "Strong", color: "#00BFFF" };
    return { label: "Medium", color: "#f59e0b" };
  };

  const passwordStrength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await account.create(ID.unique(), email, password, fullName);
      alert("Account created successfully!");
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      alert(error.message || "Signup failed.");
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
            <Icon name="smart-toy" size={42} color="#00BFFF" />
          </View>

          {/* Headline */}
          <Text className="text-[#0f1e23] text-3xl font-bold text-center">
            Create Your Account
          </Text>
          <Text className="text-gray-700/80 text-base text-center mt-2 mb-6">
            Your smart money assistant is ready.
          </Text>

          {/* Form Container */}
          <View className="w-full max-w-md bg-white/40 border border-white/30 rounded-2xl p-6 shadow-lg backdrop-blur-md">
            {/* Full Name */}
            <View className="mb-4">
              <Text className="text-[#101618] font-medium mb-2">
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                className="border border-white/50 bg-white/50 rounded-xl px-4 py-3 text-[#101618]"
                placeholderTextColor="#5e818d"
              />
            </View>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-[#101618] font-medium mb-2">
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-white/50 bg-white/50 rounded-xl px-4 py-3 text-[#101618]"
                placeholderTextColor="#5e818d"
              />
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text className="text-[#101618] font-medium mb-2">Password</Text>
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

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <View className="mt-2 flex-row items-center gap-2">
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                  <Text
                    style={{ color: passwordStrength.color }}
                    className="font-medium"
                  >
                    {passwordStrength.label} password
                  </Text>
                </View>
              )}
            </View>

            {/* Confirm Password */}
            <View className="mt-4">
              <Text className="text-[#101618] font-medium mb-2">
                Confirm Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  className="border border-white/50 bg-white/50 rounded-xl px-4 py-3 pr-12 text-[#101618]"
                  placeholderTextColor="#5e818d"
                />
                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-3"
                >
                  <Icon
                    name={
                      showConfirmPassword ? "visibility" : "visibility-off"
                    }
                    size={22}
                    color="#5e818d"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tip */}
            <View className="flex-row items-center gap-2 mt-3">
              <Icon name="smart-toy" size={16} color="#0369a1" />
              <Text className="text-sm text-sky-900/90">
                Tip: Use a unique password to secure your spending insights.
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignup}
              className="h-14 w-full mt-6 items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 shadow-lg active:scale-95"
            >
              <Text className="text-white font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <Text className="text-base text-gray-700/90 mt-6">
            Already have an account?{""}
            <Text
              onPress={() => router.push("/login")}
              className="text-[#00BFFF] font-semibold underline"
            >
              Login
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

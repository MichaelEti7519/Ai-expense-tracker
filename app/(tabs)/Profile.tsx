import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Account } from "appwrite";
import appwriteClient from "../../lib/appwrite";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const router = useRouter();
  const account = new Account(appwriteClient);

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /** -------------------------------
   *  SHIMMER LOADING
   --------------------------------*/
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerStyle = (width: number, height: number, radius = 8) => ({
    width,
    height,
    borderRadius: radius,
    overflow: "hidden",
    backgroundColor: "#E9F8FF",
    marginVertical: 6,
  });

  const Shimmer = ({ width, height, radius }: any) => {
    const translateX = shimmer.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 250],
    });

    return (
      <View style={shimmerStyle(width, height, radius)}>
        <Animated.View
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: "#D6F3FF",
            opacity: 0.6,
            transform: [{ translateX }],
          }}
        />
      </View>
    );
  };

  /** -------------------------------
   * FETCH USER
   --------------------------------*/
  useEffect(() => {
    (async () => {
      try {
        const res = await account.get();
        setUser(res);
      } catch (err) {
        console.log("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/(auth)/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  /** -------------------------------
   * AI QUOTE ANIMATION
   --------------------------------*/
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading]);

  return (
    <View className="flex-1 bg-[#ECF9FF]">

      {/* ---------------------------------
          MODERN GLASS BANNER BACKGROUND
      ----------------------------------- */}
      <View className="absolute top-0 left-0 right-0 h-64">
        <View
          className="w-full h-full"
          style={{
            backgroundColor: "rgba(0, 191, 255, 0.25)",
            transform: [{ skewY: "-6deg" }],
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
        <BlurView
          intensity={50}
          tint="light"
          className="absolute w-full h-full rounded-b-3xl"
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* ---------------------------------
            HEADER
        ----------------------------------- */}
        <View className="mt-12">
          <Text className="text-center text-2xl font-bold text-[#0A3D62] opacity-90">
            Profile
          </Text>
        </View>

        {/* ---------------------------------
            PROFILE BANNER CARD
        ----------------------------------- */}
        <BlurView intensity={45} tint="light" className="mx-4 mt-6 rounded-3xl p-5">
          <View className="flex-row items-center gap-4">

            {/* Avatar */}
            {loading ? (
              <Shimmer width={75} height={75} radius={40} />
            ) : (
              <Image
                source={{
                  uri:
                    user?.prefs?.avatar ||
                    "https://ui-avatars.com/api/?background=00bfff&color=fff&name=User",
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: "rgba(255,255,255,0.7)",
                }}
              />
            )}

            {/* Name + Email */}
            <View className="flex-1">
              {loading ? (
                <View>
                  <Shimmer width={150} height={20} />
                  <Shimmer width={200} height={16} />
                </View>
              ) : (
                <>
                  <Text className="text-xl font-bold text-slate-800">
                    {user?.name}
                  </Text>
                  <Text className="text-sm text-slate-600">{user?.email}</Text>
                </>
              )}
            </View>
          </View>
        </BlurView>

        {/* ---------------------------------
            SETTINGS LIST
        ----------------------------------- */}
        <BlurView intensity={45} tint="light" className="mx-4 mt-6 rounded-3xl">

          {loading ? (
            <>
              <Shimmer width={250} height={20} />
              <Shimmer width={250} height={20} />
              <Shimmer width={250} height={20} />
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => router.push("/edit-profile")}
                className="flex-row items-center p-5"
              >
                <Text className="flex-1 text-slate-800 font-medium">
                  Edit Profile
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={18} color="#00BFFF" />
              </TouchableOpacity>

              <View className="h-px bg-white/40 mx-4" />

              <TouchableOpacity
                onPress={() => router.push("/change-password")}
                className="flex-row items-center p-5"
              >
                <Text className="flex-1 text-slate-800 font-medium">
                  Change Password
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={18} color="#00BFFF" />
              </TouchableOpacity>

              <View className="h-px bg-white/40 mx-4" />

              <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center p-5"
              >
                <Text className="flex-1 text-slate-800 font-medium">Logout</Text>
                <MaterialIcons name="arrow-forward-ios" size={18} color="#00BFFF" />
              </TouchableOpacity>
            </>
          )}
        </BlurView>

        {/* ---------------------------------
            AI QUOTE (ANIMATED)
        ----------------------------------- */}
        {!loading && (
          <Animated.View
            style={{
              marginTop: 40,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text className="text-center text-slate-500 text-base font-semibold px-6">
              🤖 “Your data is your power — stay protected, stay smart.”
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

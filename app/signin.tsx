import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {


  return (
    <ImageBackground
      source={images.bgimage}
      resizeMode="cover"
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.2 }} // Ensures background is faint but visible
    >
      {/* Overlay with semi-transparent color */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(3, 0, 20, 0.88)", // Match primary with opacity
          padding: 20,
          justifyContent: "center",
        }}
      >
        <View className="gap-5">
          <Text className="text-white font-bold text-xl text-center">
            Sign In
          </Text>

          <AuthForm formType="signin" />

          <Text className=" text-gray-500 text-base text-center">
            Don’t have an account? <Link className=" text-accent font-extrabold text-md underline " href="/signup">Sign up</Link> now to get
            started.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

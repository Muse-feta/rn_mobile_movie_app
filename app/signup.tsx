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

const signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
  
    const handleSignIn = () => {
      // handle login logic here
    };
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
            Sign Up
          </Text>

         <AuthForm formType="signup" onSubmit={handleSignIn}/>
          <Text className=" text-gray-500 text-base text-center">
            Already have an account?{" "}
            <Link
              className=" text-accent font-extrabold text-md underline "
              href="/signin"
            >
              Sign in
            </Link>{" "}
            here.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

export default signup
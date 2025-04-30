// app/signin.tsx
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // handle login logic here
  };

  return (
    <View className="flex flex-1 p-10 bg-primary jusctify-center">
      <View className=" flex justify-center flex-1 gap-5">
        <Text className="text-white font-bold text-lg text-center">
          Sign In
        </Text>
        <Text className="text-gray-500 text-base ">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          className="border border-gray-600 rounded-xl p-8 text-white"
        />
        <Text className="text-gray-500 text-base ">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-600 rounded-xl p-8 text-white"
        />
        <TouchableOpacity
          onPress={handleSignIn}
          className=" bg-accent rounded-full py-5"
        >
          <Text className="text-white font-semibold text-base text-center">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

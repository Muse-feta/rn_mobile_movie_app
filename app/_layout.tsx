import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Make the status bar transparent */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      /> */}
      {/* <StatusBar backgroundColor="#030014" barStyle="light-content" /> */}

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}

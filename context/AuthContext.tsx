import { getCurrentUser, signInAppwrite, signOutAppwrite } from "@/services/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AuthContext = createContext<AuthContextType>({
  session: false,
  user: false ,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [session, setSession] = useState<boolean>(false);
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const checkSession = async () => {
      try {
        const storedSession = await AsyncStorage.getItem("userSession");
        // console.log("storedSession", storedSession);
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession);
          setUser(parsedSession.user);
          setSession(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    useEffect(() => {
      checkSession(); // Check session on app load
    }, []);

    useEffect(() => {
      const checkUser = async () => {
        setLoading(true);
        try {
          const userInfo = await getCurrentUser();
          setUser(userInfo);
          setSession(true);
        } catch (error: any) {
          console.log("No active session found:", error.message);
        } finally {
          setLoading(false);
        }
      };

      checkUser();
    }, []);

    const signIn = async ({email, password} : {email: string, password: string}) => {
      console.log("🔥 signIn triggered with:", email, password);
        setLoading(true);
        try {
          await signInAppwrite(email, password);
          const userInfo = await getCurrentUser();
          setUser(userInfo);
          setSession(true);
          await AsyncStorage.setItem(
            "userSession",
            JSON.stringify({ user: userInfo, session: true })
          );
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    }
    const signOut = async() => {
      if (!session) return;
      try {
        await signOutAppwrite();
        console.log("🔓 Signed out");
        setSession(false);
        setUser(null);
        await AsyncStorage.removeItem("userSession");
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    };

    const contextData = { session, user, signIn, signOut };
    return (
      <AuthContext.Provider value={contextData}>
        {loading ? (
          <SafeAreaView>
            <Text>Loading...</Text>
          </SafeAreaView>
        ) : (
          children
        )}
      </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
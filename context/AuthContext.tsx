import { getCurrentUser, signInAppwrite } from "@/services/appwrite";
import { createContext, useContext, useState } from "react";
import { Text } from "react-native";
import { Models } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";



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

    const signIn = async ({email, password} : {email: string, password: string}) => {
      console.log("🔥 signIn triggered with:", email, password);
        setLoading(true);
        try {
              const currentSession = await getCurrentUser(); // Implement this function
              if (currentSession) {
                setSession(true);
                setUser(currentSession);
                console.log("🔒 Already logged in");
                return;
              }
          await signInAppwrite(email, password);
          const userInfo = await getCurrentUser();
          setUser(userInfo);
          setSession(true);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    }
    const signOut = () => {};

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
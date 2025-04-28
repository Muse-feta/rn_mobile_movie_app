import { createContext, useContext, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthContext = createContext<AuthContextType>({
  session: false,
  user: false,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<boolean>(false);
    const [user, setUser] = useState(false);

    const signIn = () => {}
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
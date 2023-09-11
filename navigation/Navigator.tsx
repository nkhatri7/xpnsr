import { FC } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import RootTabs from "./RootTabs";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";

const Navigator: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Root" component={RootTabs} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </>
  );
};

export default Navigator;

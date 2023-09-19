import { FC, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParamList } from "../types/navigation";
import RootTabs from "./RootTabs";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import AddExpenseScreen from "../screens/AddExpense";
import SortExpensesScreen from "../screens/SortExpenses";
import FilterExpensesScreen from "../screens/FilterExpenses";
import EditProfileScreen from "../screens/EditProfile";

const Navigator: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isDarkMode } = useTheme();
  const { isAuthenticated, loading } = useAuth();

  // Show splash screen until auth state has loaded to prevent jumping from
  // auth screen to home screen
  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Root" component={RootTabs} />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{ presentation: "fullScreenModal" }}
            />
            <Stack.Screen
              name="SortExpenses"
              component={SortExpensesScreen}
              options={{ presentation: "fullScreenModal" }}
            />
            <Stack.Screen
              name="FilterExpenses"
              component={FilterExpensesScreen}
              options={{ presentation: "fullScreenModal" }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{ presentation: "fullScreenModal" }}
            />
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

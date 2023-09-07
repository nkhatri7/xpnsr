import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import RegisterScreen from "./screens/Register";
import { RootStackParamList } from "./types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useFonts } from "expo-font";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { FC } from "react";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/Login";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Medium": Roboto_500Medium,
    "Roboto-Bold": Roboto_700Bold,
  });

  const hideSplashScreen = async () => await SplashScreen.hideAsync();

  if (fontsLoaded) {
    hideSplashScreen();
  } else {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </NavigationContainer>
  );
}

const Navigator: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { useFonts } from "expo-font";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Navigator from "./navigation/Navigator";
import { ExpenseProvider } from "./context/ExpenseContext";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": Roboto_400Regular,
    "Roboto-Medium": Roboto_500Medium,
    "Roboto-Bold": Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider>
          <ExpenseProvider>
            <Navigator />
          </ExpenseProvider>
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

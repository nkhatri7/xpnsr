import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme, darkTheme, lightTheme } from "../constants/colours";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  isDarkMode: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  theme: lightTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const initialColourScheme = Appearance.getColorScheme();
  const initialTheme = initialColourScheme === "dark" ? darkTheme : lightTheme;
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const getPreferredTheme = async () => {
      const preferredTheme = await AsyncStorage.getItem("theme");
      if (preferredTheme) {
        setTheme(preferredTheme === "dark" ? darkTheme : lightTheme);
      }
    };

    getPreferredTheme();
  }, []);

  const toggleTheme = async () => {
    Appearance.setColorScheme(theme === lightTheme ? "dark" : "light");
    await AsyncStorage.setItem(
      "theme",
      theme === lightTheme ? "dark" : "light"
    );
    setTheme((prevTheme) => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: theme === lightTheme ? false : true,
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

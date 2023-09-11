import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Theme, darkTheme, lightTheme } from "../constants/colours";
import { Appearance } from "react-native";

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

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      Appearance.setColorScheme(prevTheme === lightTheme ? "dark" : "light");
      return prevTheme === lightTheme ? darkTheme : lightTheme;
    });
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

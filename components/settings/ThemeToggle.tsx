import { FC } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import SettingsButton from "./SettingsButton";

const ThemeToggle: FC = () => {
  const { isDarkMode, theme, toggleTheme } = useTheme();

  return (
    <SettingsButton
      text={`Switch to ${isDarkMode ? "Light Mode" : "Dark Mode"}`}
      onPress={toggleTheme}
    >
      <Ionicons
        name={isDarkMode ? "sunny" : "moon"}
        color={theme.text}
        size={24}
      />
    </SettingsButton>
  );
};

export default ThemeToggle;

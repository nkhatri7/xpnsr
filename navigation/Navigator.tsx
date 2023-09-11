import { FC } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import AuthStack from "./AuthStack";
import RootTabs from "./RootTabs";

const Navigator: FC = () => {
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {isAuthenticated ? <RootTabs /> : <AuthStack />}
    </>
  );
};

export default Navigator;

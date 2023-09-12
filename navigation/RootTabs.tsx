import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabsParamList } from "../types/navigation";
import { colourVariables } from "../constants/colours";
import Home from "../screens/Home";
import TabIcon from "../components/tabs/TabIcon";
import { useTheme } from "../context/ThemeContext";

const RootTabs: FC = () => {
  const Tab = createBottomTabNavigator<RootTabsParamList>();
  const { isDarkMode, theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colourVariables.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: isDarkMode ? "#6D6D6D" : "#CCCCCC",
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;

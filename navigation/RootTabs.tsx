import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/ThemeContext";
import { RootTabsParamList } from "../types/navigation";
import { colourVariables } from "../constants/colours";
import HomeScreen from "../screens/Home";
import ExpensesScreen from "../screens/Expenses";
import TabIcon from "../components/tabs/TabIcon";

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{
          tabBarIcon: ({ color }) => <TabIcon name="cash" color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;

import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabsParamList } from "../types/navigation";
import { colourVariables } from "../constants/colours";
import Home from "../screens/Home";
import TabIcon from "../components/tabs/TabIcon";

const RootTabs: FC = () => {
  const Tab = createBottomTabNavigator<RootTabsParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colourVariables.primary,
        headerShown: false,
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

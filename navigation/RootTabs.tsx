import { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabsParamList } from "../types/navigation";
import Home from "../screens/Home";
import TabIcon from "../components/tabs/TabIcon";
import { colourVariables } from "../constants/colours";

const RootTabs: FC = () => {
  const Tab = createBottomTabNavigator<RootTabsParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colourVariables.primary,
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
import { Ionicons } from "@expo/vector-icons";
import { FC, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface Props {
  isSelectOpen: boolean;
}

const SelectArrow: FC<Props> = ({ isSelectOpen }) => {
  const { theme } = useTheme();

  // Rotation animation for select trigger arrow
  const rotateValue = useRef(new Animated.Value(0)).current;
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const rotateArrowUp = () => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const rotateArrowDown = () => {
    Animated.timing(rotateValue, {
      toValue: 0,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isSelectOpen) {
      rotateArrowUp();
    } else {
      rotateArrowDown();
    }
  }, [isSelectOpen]);

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Ionicons
        name="chevron-down"
        size={24}
        color={theme.text}
      />
    </Animated.View>
  );
};

export default SelectArrow;

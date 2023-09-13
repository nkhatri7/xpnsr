import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const CloseButton: FC<Props> = ({ onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="close"
          size={28}
          color={theme.text}
        />
      </View>
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 30,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

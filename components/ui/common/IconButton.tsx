import { FC, PropsWithChildren, useMemo } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../constants/colours";
import Text from "../text/Text";

interface Props {
  iconName: keyof typeof Ionicons["glyphMap"];
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const IconButton: FC<PropsWithChildren<Props>> = ({
  children,
  iconName,
  onPress,
  style: customStyle,
  textStyle,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        customStyle
      ]}
      android_ripple={{ color: theme.primaryAlt }}
    >
      <View>
        <Ionicons name={iconName} size={16} color="white" />
      </View>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default IconButton;

const styling = (theme: Theme) => StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.primary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonPressed: {
    backgroundColor: theme.primaryAlt
  },
  text: {
    fontFamily: "Roboto-Medium",
    color: "#FFF",
    fontSize: 16,
  },
});

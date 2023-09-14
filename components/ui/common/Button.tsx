import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";
import Text from "../text/Text";

interface Props {
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  disabled = false,
  onPress,
  style: customStyle,
  textStyle,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        customStyle,
        disabled && { opacity: 0.7 }
      ]}
      onPress={onPress}
      android_ripple={{ color: theme.primaryAlt }}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styling = (theme: Theme) => StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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

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
  secondary?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: FC<PropsWithChildren<Props>> = ({
  children,
  secondary,
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
        secondary && styles.secondaryButton,
        pressed && (
          secondary ? styles.secondaryButtonPressed : styles.buttonPressed
        ),
        customStyle,
        disabled && { opacity: 0.7 }
      ]}
      onPress={onPress}
      android_ripple={{ color: theme.primaryAlt }}
      disabled={disabled}
    >
      <Text style={[styles.text, secondary && styles.secondaryText, textStyle]}>
        {children}
      </Text>
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
  secondaryButton: {
    backgroundColor: theme.secondary,
  },
  buttonPressed: {
    backgroundColor: theme.primaryAlt
  },
  secondaryButtonPressed: {
    backgroundColor: theme.secondaryAlt,
  },
  text: {
    fontFamily: "Roboto-Medium",
    color: "#FFF",
    fontSize: 16,
  },
  secondaryText: {
    color: "#000",
  },
});

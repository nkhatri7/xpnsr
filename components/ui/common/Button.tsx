import { Pressable, StyleSheet } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";
import Text from "../text/Text";

interface Props {
  onPress?: () => void;
}

const Button: FC<PropsWithChildren<Props>> = ({ children, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={onPress}
      android_ripple={{ color: theme.primaryAlt }}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styling = (theme: Theme) => StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.primary,
    borderRadius: 10,
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

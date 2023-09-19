import { Pressable, StyleSheet, View } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../constants/colours";
import Text from "../ui/text/Text";

interface Props {
  text: string;
  onPress: () => void;
}

const SettingsButton: FC<PropsWithChildren<Props>> = ({
  children,
  text,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>{children}</Pressable>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default SettingsButton;

const styling = (theme: Theme) => StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: theme.card,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    maxWidth: 80,
    textAlign: "center",
  },
});
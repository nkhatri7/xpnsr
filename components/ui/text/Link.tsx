import { FC, PropsWithChildren, useMemo } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../constants/colours";

interface Props {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

const Link: FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  style: customTextStyle,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
      onPress={onPress}
    >
      <Text style={[styles.text, customTextStyle]}>{children}</Text>
    </Pressable>
  );
};

export default Link;

const styling = (theme: Theme) => StyleSheet.create({
  link: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  linkPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  text: {
    color: theme.text,
  },
});
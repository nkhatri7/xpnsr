import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";

interface Props {
  style?: StyleProp<TextStyle>;
}

const Heading: FC<PropsWithChildren<Props>> = ({
  children,
  style: customStyle,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return <Text style={[styles.heading, customStyle]}>{children}</Text>;
};

export default Heading;

const styling = (theme: Theme) => StyleSheet.create({
  heading: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    color: theme.text,
  },
});

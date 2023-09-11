import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { FC, PropsWithChildren } from "react";

interface Props {
  style?: StyleProp<TextStyle>;
}

const Heading: FC<PropsWithChildren<Props>> = ({
  children,
  style: customStyle,
}) => {
  return <Text style={[styles.heading, customStyle]}>{children}</Text>;
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
});

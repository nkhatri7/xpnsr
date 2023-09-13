import { FC, PropsWithChildren } from "react";
import { Pressable, StyleProp, StyleSheet, TextStyle } from "react-native";
import Text from "./Text";

interface Props {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

const Link: FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  style: customTextStyle,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
      onPress={onPress}
    >
      <Text style={customTextStyle}>{children}</Text>
    </Pressable>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    borderRadius: 5,
  },
  linkPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
});
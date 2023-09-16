import { FC, PropsWithChildren, useMemo } from "react";
import {
  StyleSheet,
  Text as DefaultText,
  StyleProp,
  TextStyle,
  TextProps,
} from "react-native";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";

interface Props {
  style?: StyleProp<TextStyle>;
}

const Text: FC<PropsWithChildren<Props & TextProps>> = ({
  children,
  style: customStyles,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <DefaultText style={[styles.text, customStyles]} {...props}>
      {children}
    </DefaultText>
  );
};

export default Text;

const styling = (theme: Theme) => StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    color: theme.text,
  },
});

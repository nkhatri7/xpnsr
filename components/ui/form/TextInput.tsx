import {
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { FC, useMemo, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../constants/colours";

const TextInput: FC<TextInputProps> = (props) => {
  const { isDarkMode, theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);
  const [borderStyles, setBorderStyles] = useState<StyleProp<TextStyle>>({});

  return (
    <DefaultTextInput
      style={[styles.textInput, borderStyles]}
      keyboardAppearance={isDarkMode ? "dark" : "light"}
      onFocus={() => setBorderStyles(styles.focusedInput)}
      onBlur={() => setBorderStyles({})}
      {...props}
    />
  );
};

export default TextInput;

const styling = (theme: Theme) => StyleSheet.create({
  textInput: {
    width: "100%",
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.background,
    color: theme.text,
  },
  focusedInput: {
    borderColor: theme.primary,
    borderWidth: 2,
  },
});

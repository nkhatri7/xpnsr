import {
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  View,
  Text,
} from "react-native";
import { FC, useMemo, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../constants/colours";

interface Props {
  errorMessage: string;
}

const TextInput: FC<Props & TextInputProps> = ({ errorMessage, ...props }) => {
  const { isDarkMode, theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);
  const [borderStyles, setBorderStyles] = useState<StyleProp<TextStyle>>({});

  return (
    <View style={styles.inputContainer}>
      <DefaultTextInput
        style={[
          styles.textInput,
          borderStyles,
          errorMessage !== "" && styles.inputError,
        ]}
        keyboardAppearance={isDarkMode ? "dark" : "light"}
        onFocus={() => setBorderStyles(styles.focusedInput)}
        onBlur={() => setBorderStyles({})}
        {...props}
      />
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default TextInput;

const styling = (theme: Theme) => StyleSheet.create({
  inputContainer: {
    width: "100%",
    rowGap: 2,
  },
  textInput: {
    width: "100%",
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    color: theme.text,
  },
  focusedInput: {
    borderColor: theme.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: theme.error,
  },
  errorMessage: {
    fontFamily: "Roboto-Regular",
    color: theme.error,
    fontSize: 13,
  }
});

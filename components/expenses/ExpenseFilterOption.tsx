import { FC, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "../ui/text/Text";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  value: any;
  isSelected: boolean;
  onPress: () => void;
}

const ExpenseFilterOption: FC<Props> = ({ value, isSelected, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
      android_ripple={{ color: theme.card }}
      onPress={onPress}
    >
      <Text>{value}</Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
      )}
    </Pressable>
  );
};

export default ExpenseFilterOption;

const styling = (theme: Theme) => StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  optionPressed: {
    backgroundColor: theme.card,
  },
});

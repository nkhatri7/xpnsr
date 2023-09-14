import { FC, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ExpenseSortOption } from "../../types/expenses";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import Text from "../ui/text/Text";

interface Props {
  sortOption: ExpenseSortOption;
  isSelected: boolean;
  onPress: () => void;
}

const ExpenseSortItem: FC<Props> = ({ sortOption, isSelected, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
      android_ripple={{ color: theme.card }}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, isSelected && styles.selectedItemText]}>
          {sortOption}
        </Text>
      </View>
      <View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={theme.primary} />
        )}
      </View>
    </Pressable>
  );
};

export default ExpenseSortItem;

const styling = (theme: Theme) => StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  optionPressed: {
    backgroundColor: theme.card,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 26,
  },
  text: {
    fontSize: 16,
  },
  selectedItemText: {
    fontFamily: "Roboto-Medium",
  }
});

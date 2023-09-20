import { StyleSheet, View } from "react-native";
import { FC, useMemo } from "react";
import { ExpenseCategory } from "../../types/expenses";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { getCategoryIconName } from "../../utils/expenses";
import Text from "../ui/text/Text";

interface Props {
  category: ExpenseCategory;
  spend?: number;
  count?: number;
}

const CategoryItem: FC<Props> = ({ category, spend, count }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getCategoryIconName(category)}
          size={24}
          color={theme.primary}
        />
      </View>
      <Text style={styles.text}>{category}</Text>
      {spend !== undefined && (
        <Text style={styles.text}>${spend.toFixed(2)}</Text>
      )}
      {count !== undefined && (
        <Text style={styles.text}>{count.toLocaleString()}</Text>
      )}
    </View>
  );
};

export default CategoryItem;

const styling = (theme: Theme) => StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: 90,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: theme.background,
    borderRadius: 100,
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
});

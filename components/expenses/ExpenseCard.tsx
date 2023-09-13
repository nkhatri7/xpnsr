import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Expense } from "../../types/expenses";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import Text from "../ui/text/Text";

interface Props {
  expense: Expense;
}

const ExpenseCard: FC<Props> = ({ expense }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.card}>
      <Text>{expense.name}</Text>
    </View>
  );
};

export default ExpenseCard;

const styling = (theme: Theme) => StyleSheet.create({
  card: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: theme.card,
  },
});

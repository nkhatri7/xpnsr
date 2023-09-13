import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Expense } from "../../types/expenses";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import Text from "../ui/text/Text";
import { Ionicons } from "@expo/vector-icons";
import { getCategoryIconName } from "../../utils/expenses";

interface Props {
  expense: Expense;
}

const ExpenseCard: FC<Props> = ({ expense }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View>
          <Ionicons
            name={getCategoryIconName(expense.category)}
            size={32}
            color={theme.primary}
          />
        </View>
        <View style={{ rowGap: 5 }}>
          <Text style={styles.expenseName}>{expense.name}</Text>
          <Text style={{ fontSize: 14 }}>{expense.date.toDateString()}</Text>
        </View>
      </View>
      <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  expenseName: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  expenseAmount: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
});

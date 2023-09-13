import { FC, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";
import { User } from "firebase/auth";
import Heading from "../components/ui/text/Heading";
import AddExpenseButton from "../components/expenses/AddExpenseButton";
import ExpenseCard from "../components/expenses/ExpenseCard";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";

const ExpensesScreen: FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { expenses, updateExpenses, loading, hasError } = useExpenses();

  const fetchExpenses = useCallback(async (user: User | null) => {
    if (user) {
      await updateExpenses(user.uid);
      if (hasError) {
        Alert.alert("Error","There was an issue while fetching your expenses.");
      }
    }
  }, [user]);

  useEffect(() => {
    fetchExpenses(user);
  }, [user]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Heading style={{ fontSize: 28 }}>Expenses</Heading>
        <FlatList
          data={expenses}
          renderItem={({ item }) => <ExpenseCard expense={item} />}
          keyExtractor={expense => expense.id}
          horizontal={false}
          contentContainerStyle={styles.expenseListContainer}
          style={{ width: "100%" }}
          alwaysBounceVertical={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => fetchExpenses(user)}
              colors={[theme.primary]}
              tintColor={theme.primary}
              title="Fetching your expenses"
              titleColor={theme.text}
            />
          }
        />
        <AddExpenseButton />
      </View>
    </ScreenWrapper>
  );
};

export default ExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  expenseListContainer: {
    width: "100%",
    alignItems: "stretch",
    marginTop: 30,
    rowGap: 5,
  },
});

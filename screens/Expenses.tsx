import { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { getUserExpenses } from "../utils/expenses";
import { Expense } from "../types/expenses";
import { User } from "firebase/auth";
import { colourVariables } from "../constants/colours";
import Heading from "../components/ui/text/Heading";
import AddExpenseButton from "../components/expenses/AddExpenseButton";
import Text from "../components/ui/text/Text";
import ExpenseCard from "../components/expenses/ExpenseCard";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";

const ExpensesScreen: FC = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserExpenses = useCallback(async (user: User | null) => {
    if (user) {
      try {
        setLoading(true);
        const expenses = await getUserExpenses(user.uid);
        setExpenses(expenses);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        Alert.alert("Error","There was an error in fetching your expenses");
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserExpenses(user);
  }, [user]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Heading style={{ fontSize: 28 }}>Expenses</Heading>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colourVariables.primary} />
            <Text>Fetching your expenses</Text>
          </View>
        )}
        <View style={styles.expenseListContainer}>
          <FlatList
            data={expenses}
            renderItem={({ item }) => <ExpenseCard expense={item} />}
            keyExtractor={expense => expense.id}
          />
        </View>
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
    alignItems: "center",
    marginTop: 50,
  },
});

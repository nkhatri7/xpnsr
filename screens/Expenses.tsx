import { FC, useCallback, useEffect } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";
import { useTheme } from "../context/ThemeContext";
import { User } from "firebase/auth";
import Heading from "../components/ui/text/Heading";
import AddExpenseButton from "../components/expenses/AddExpenseButton";
import ExpenseCard from "../components/expenses/ExpenseCard";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";
import Text from "../components/ui/text/Text";
import IconButton from "../components/ui/common/IconButton";

const ExpensesScreen: FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const {
    sortOption,
    sortedExpenses,
    updateExpenses,
    loading,
    hasError,
  } = useExpenses();
  // Using useNavigation instead of default navigation prop so that the stack
  // navigation can be accessed
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchExpenses = useCallback(async (user: User | null) => {
    if (user) {
      await updateExpenses(user.uid);
      if (hasError) {
        Alert.alert(
          "Error",
          "There was an issue while fetching your expenses."
        );
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
        <View style={styles.optionsContainer}>
          <IconButton
            iconName="filter"
            textStyle={{ maxWidth: 120 }}
            onPress={() => navigation.navigate("SortExpenses")}
          >
            {sortOption}
          </IconButton>
          <IconButton
            iconName="funnel-outline"
            onPress={() => navigation.navigate("FilterExpenses")}
          >
            Filter
          </IconButton>
        </View>
        {!loading && sortedExpenses.length === 0 && (
          <View style={styles.noExpensesContainer}>
            <Text style={styles.noExpensesText}>You have no expenses.</Text>
            <Text style={styles.noExpensesText}>
              Press the plus button to add one!
            </Text>
          </View>
        )}
        <FlatList
          data={sortedExpenses}
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
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  noExpensesContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  noExpensesText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Medium"
  },
  expenseListContainer: {
    width: "100%",
    alignItems: "stretch",
    marginTop: 30,
    rowGap: 8,
  },
});

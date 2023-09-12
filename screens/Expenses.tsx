import { FC } from "react";
import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";
import Heading from "../components/ui/text/Heading";
import AddExpenseButton from "../components/expenses/AddExpenseButton";

const ExpensesScreen: FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Heading style={{ fontSize: 28 }}>Expenses</Heading>
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
});

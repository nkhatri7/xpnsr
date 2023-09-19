import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import { SortExpensesScreenProps } from "../types/navigation";
import { ExpenseSortOption } from "../types/expenses";
import StackScreenWrapper from "../components/ui/layout/StackScreenWrapper";
import ExpenseSortItem from "../components/expenses/ExpenseSortItem";
import Button from "../components/ui/common/Button";

const sortOptions: ExpenseSortOption[] = Object.values(ExpenseSortOption);

const SortExpensesScreen: FC<SortExpensesScreenProps> = ({ navigation }) => {
  const { sortOption, setSortOption } = useExpenses();
  const [selectedOption, setSelectedOption] = useState<ExpenseSortOption>(
    sortOption
  );

  const handleConfirm = () => {
    if (selectedOption !== sortOption) {
      setSortOption(selectedOption);
    }
    navigation.navigate("Root", { screen: "Expenses" });
  };

  return (
    <StackScreenWrapper title="Sort Expenses" scrollable={true}>
      <View style={styles.mainContentContainer}>
        <View>
          {sortOptions.map((option, index) => (
            <ExpenseSortItem
              key={index}
              sortOption={option}
              isSelected={option === selectedOption}
              onPress={() => setSelectedOption(option)}
            />
          ))}
        </View>
        <View>
          <Button onPress={handleConfirm}>Confirm</Button>
        </View>
      </View>
    </StackScreenWrapper>
  );
};

export default SortExpensesScreen;

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
    alignItems: "center",
  },
  mainContentContainer: {
    marginTop: 50,
    flex: 1,
    justifyContent: "space-between",
  },
});

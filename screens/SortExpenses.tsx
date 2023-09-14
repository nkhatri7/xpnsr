import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useExpenses } from "../context/ExpenseContext";
import ScrollScreenWrapper from "../components/ui/layout/ScrollScreenWrapper";
import Heading from "../components/ui/text/Heading";
import CloseButton from "../components/ui/common/CloseButton";
import { SortExpensesScreenProps } from "../types/navigation";
import { ExpenseSortOption } from "../types/expenses";
import ExpenseSortItem from "../components/expenses/ExpenseSortItem";
import Button from "../components/ui/common/Button";

const sortOptions: ExpenseSortOption[] = Object.values(ExpenseSortOption);

const SortExpenses: FC<SortExpensesScreenProps> = ({ navigation }) => {
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
    <ScrollScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading style={{ fontSize: 24 }}>Sort Expenses</Heading>
          <CloseButton onPress={navigation.goBack.bind(this)} />
        </View>
        <View style={styles.mainContentContainer}>
          <View>
            {sortOptions.map((option, index) => (
              <ExpenseSortItem
                key={index}
                sortOption={option}
                isSelected={option === selectedOption}
                onPress={setSelectedOption.bind(this, option)}
              />
            ))}
          </View>
          <View>
            <Button onPress={handleConfirm}>Confirm</Button>
          </View>
        </View>
      </View>
    </ScrollScreenWrapper>
  );
};

export default SortExpenses;

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

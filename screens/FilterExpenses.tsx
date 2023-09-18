import { FC, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FilterExpensesScreenProps } from "../types/navigation";
import { ExpenseCategory, ExpenseDateFilterOption } from "../types/expenses";
import { useTheme } from "../context/ThemeContext";
import { Theme } from "../constants/colours";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";
import Heading from "../components/ui/text/Heading";
import CloseButton from "../components/ui/common/CloseButton";
import Accordion from "../components/ui/common/Accordion";
import ExpenseFilterOption from "../components/expenses/ExpenseFilterOption";
import Button from "../components/ui/common/Button";
import { useExpenses } from "../context/ExpenseContext";

const expenseCategories: ExpenseCategory[] = Object.values(ExpenseCategory);
const dateFilterOptions: ExpenseDateFilterOption[] = Object.values(
  ExpenseDateFilterOption
);

const FilterExpensesScreen: FC<FilterExpensesScreenProps> = ({
  navigation
}) => {
  const { filter, setFilter } = useExpenses();
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  // Have local state of selected filters to prevent filter function from
  // running every time a filter is selected
  const [
    selectedCategories,
    setSelectedCategories
  ] = useState<ExpenseCategory[]>(filter.categories);
  const [
    selectedDateFilter,
    setSelectedDateFilter
  ] = useState<ExpenseDateFilterOption>(filter.date);

  const handleCategoryPress = (category: ExpenseCategory) => {
    if (selectedCategories.includes(category)) {
      const updatedFilter = [...selectedCategories].filter((currCategory) => (
        category !== currCategory
      ));
      setSelectedCategories(updatedFilter);
    } else {
      const updatedFilter = [...selectedCategories, category];
      setSelectedCategories(updatedFilter);
    }
  };

  const handleApplyFilters = () => {
    setFilter({
      categories: selectedCategories,
      date: selectedDateFilter,
    });
    navigation.goBack();
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDateFilter(ExpenseDateFilterOption.NONE);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading style={{ fontSize: 24 }}>Filter Expenses</Heading>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.mainContentContainer}>
          <ScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{ rowGap: 20 }}
          >
            <Accordion
              title="Category"
              subtitle={selectedCategories.length > 0
                ? `${selectedCategories.length} selected`
                : "Select one or more"
              }
            >
              {expenseCategories.map((category, index) => (
                <ExpenseFilterOption
                  key={index}
                  value={category}
                  isSelected={selectedCategories.includes(category)}
                  onPress={() => handleCategoryPress(category)}
                />
              ))}
            </Accordion>
            <Accordion title="Date" subtitle="Select one">
              {dateFilterOptions.map((option, index) => (
                <ExpenseFilterOption
                  key={index}
                  value={option}
                  isSelected={selectedDateFilter.includes(option)}
                  onPress={() => setSelectedDateFilter(option)}
                />
              ))}
            </Accordion>
          </ScrollView>
          <View style={styles.filterActionsContainer}>
            <Button style={{ flex: 1 }} secondary={true} onPress={clearFilters}>
              Clear Filters
            </Button>
            <Button style={{ flex: 1 }} onPress={handleApplyFilters}>
              Apply
            </Button>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default FilterExpensesScreen;

const styling = (theme: Theme) => StyleSheet.create({
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
    backgroundColor: theme.background,
    paddingBottom: 50,
  },
  mainContentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  filterActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 30,
    columnGap: 10,
  },
});

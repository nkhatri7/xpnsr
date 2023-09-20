import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { getCurrentMonthName } from "../../utils/date";
import { useExpenses } from "../../context/ExpenseContext";
import { getCurrentMonthStats } from "../../utils/expenses";
import Heading from "../ui/text/Heading";
import Text from "../ui/text/Text";
import StatCard from "./StatCard";
import CategoryItem from "./CategoryItem";

const MonthlyStats: FC = () => {
  const { expenses } = useExpenses();

  const stats = useMemo(() => getCurrentMonthStats(expenses), [expenses]);

  return (
    <StatCard>
      <View style={{ rowGap: 20 }}>
        <Heading>{getCurrentMonthName()} Stats</Heading>
        <Text style={styles.statHeading}>
          Total spend: ${stats.spend.toFixed(2)}
        </Text>
        <View>
          <Text style={styles.statHeading}>Highest spending categories</Text>
          <View style={styles.categoriesContainer}>
            {stats.categoryStats.slice(0, 3).map((categoryStat, index) => (
              <CategoryItem
                key={index}
                category={categoryStat.category}
                spend={categoryStat.totalSpend}
              />
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.statHeading}>Most frequent categories</Text>
          <View style={styles.categoriesContainer}>
            {[...stats.categoryStats]
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((categoryStat, index) => (
                <CategoryItem
                  key={index}
                  category={categoryStat.category}
                  count={categoryStat.count}
                />
              ))}
          </View>
        </View>
      </View>
    </StatCard>
  );
};

export default MonthlyStats;

const styles = StyleSheet.create({
  statHeading: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  categoriesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 20,
  },
});

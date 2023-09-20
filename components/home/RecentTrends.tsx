import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useExpenses } from "../../context/ExpenseContext";
import { getRecentTrends } from "../../utils/expenses";
import StatCard from "./StatCard";
import Heading from "../ui/text/Heading";
import Text from "../ui/text/Text";
import SpendingChart from "./SpendingChart";
import CategoryItem from "./CategoryItem";

const RecentTrends: FC = () => {
  const { expenses } = useExpenses();
  const trends = useMemo(() => getRecentTrends(expenses), [expenses]);

  return (
    <StatCard>
      <View style={{ rowGap: 20 }}>
        <Heading>Recent Trends</Heading>
        <Text style={styles.statHeading}>
          Spending in last 3 months: ${trends.spend.toFixed(2)}
        </Text>
        <View>
          <Text style={styles.statHeading}>Monthly spending comparison</Text>
          <SpendingChart
            monthlySpend={trends.monthlySpend}
            totalSpend={trends.spend}
          />
        </View>
        <View>
          <Text style={styles.statHeading}>Highest spending categories</Text>
          <View style={styles.categoriesContainer}>
            {trends.categoryStats.slice(0, 3).map((categoryStat, index) => (
              <CategoryItem
                key={index}
                category={categoryStat.category}
                spend={categoryStat.totalSpend}
              />
            ))}
          </View>
        </View>
      </View>
    </StatCard>
  );
};

export default RecentTrends;

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

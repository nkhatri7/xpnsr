import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { MonthSpend } from "../../utils/expenses";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import Text from "../ui/text/Text";

interface Props {
  monthlySpend: MonthSpend[];
  totalSpend: number;
}

const SpendingChart: FC<Props> = ({ monthlySpend, totalSpend }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {monthlySpend.map(({ month, spend }) => (
          <View key={month} style={styles.columnContainer}>
            <Text style={styles.value}>${spend.toFixed(2)}</Text>
            <View
              style={[
                styles.column,
                { height: ((spend / totalSpend) * 150) || 0 }
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.xAxisHeadings}>
        {monthlySpend.map(({ month }) => (
          <View key={month} style={styles.monthNameContainer}>
            <Text style={styles.monthName}>{month.substring(0, 3)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SpendingChart;

const styling = (theme: Theme) => StyleSheet.create({
  chartContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  chart: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    minHeight: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  columnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  column: {
    backgroundColor: theme.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 70,
  },
  value: {
    fontFamily: "Roboto-Medium",
    paddingBottom: 3,
  },
  xAxisHeadings: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    width: "100%",
  },
  monthNameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  monthName: {
    fontFamily: "Roboto-Medium",
  },
});
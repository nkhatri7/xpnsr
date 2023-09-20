import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "firebase/auth";
import { Theme } from "../constants/colours";
import { useTheme } from "../context/ThemeContext";
import ScrollScreenWrapper from "../components/ui/layout/ScrollScreenWrapper";
import Heading from "../components/ui/text/Heading";
import MonthlyStats from "../components/home/MonthlyStats";
import { useExpenses } from "../context/ExpenseContext";

const HomeScreen: FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { loading, updateExpenses } = useExpenses();
  const styles = useMemo(() => styling(theme), [theme]);

  const fetchExpenses = useCallback(async (user: User | null) => {
    if (user) {
      await updateExpenses(user.uid);
    }
  }, [user]);

  useEffect(() => {
    fetchExpenses(user);
  }, [user]);

  return (
    <ScrollScreenWrapper>
      <View style={styles.container}>
        <Heading style={{ fontSize: 36 }}>Hi {getUserFirstName(user)}</Heading>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.primary} size="large" />
          </View>
        ) : (
          <>
            <View style={styles.statSummaryContainer}>
              <MonthlyStats />
            </View>
            <View style={styles.statSummaryContainer}>
              <Heading>Your top spending categories</Heading>
              <View style={styles.placeholderCard}></View>
            </View>
          </>
        )}
      </View>
    </ScrollScreenWrapper>
  );
};

export default HomeScreen;

const styling = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statSummaryContainer: {
    marginTop: 30,
    rowGap: 10,
  },
  placeholderCard: {
    width: "100%",
    paddingVertical: 70,
    borderRadius: 10,
    backgroundColor: theme.card,
  },
});

const getUserFirstName = (user: User | null): string => {
  if (!user) {
    return "";
  }
  const names = user.displayName?.split(" ") ?? [""];
  return names[0];
};

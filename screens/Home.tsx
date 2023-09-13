import { StyleSheet, View } from "react-native";
import { FC, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { User } from "firebase/auth";
import { getCurrentMonthName } from "../utils/date";
import { Theme } from "../constants/colours";
import { useTheme } from "../context/ThemeContext";
import ScrollScreenWrapper from "../components/ui/layout/ScrollScreenWrapper";
import Heading from "../components/ui/text/Heading";

const HomeScreen: FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <ScrollScreenWrapper>
      <View style={styles.container}>
        <Heading style={{ fontSize: 36 }}>Hi {getUserFirstName(user)}</Heading>
        <View style={styles.statSummaryContainer}>
          <Heading>{getCurrentMonthName()} spend</Heading>
          <View style={styles.placeholderCard}></View>
        </View>
        <View style={styles.statSummaryContainer}>
          <Heading>Your top spending categories</Heading>
          <View style={styles.placeholderCard}></View>
        </View>
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

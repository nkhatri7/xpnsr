import { FC, PropsWithChildren, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Theme } from "../../constants/colours";

const StatCard: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <View style={styles.card}>{children}</View>
  );
};

export default StatCard;

const styling = (theme: Theme) => StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: theme.card,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
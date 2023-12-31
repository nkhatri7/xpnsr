import { SafeAreaView, StyleSheet } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Theme } from "../../../constants/colours";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
};

export default ScreenWrapper;

const styling = (theme: Theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
  },
});

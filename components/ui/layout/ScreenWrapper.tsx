import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";

const ScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollWrapper}
      alwaysBounceVertical={false}
    >
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </ScrollView>
  );
};

export default ScreenWrapper;

const styling = (theme: Theme) => StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
  },
});

import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { FC, PropsWithChildren, useMemo } from "react";
import ScreenWrapper from "./ScreenWrapper";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";

const ScrollScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollWrapper}
        alwaysBounceVertical={false}
      >
        <ScreenWrapper>{children}</ScreenWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollScreenWrapper;

const styling = (theme: Theme) => StyleSheet.create({
  wrapper: {
    backgroundColor: theme.background,
    flex: 1,
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
});

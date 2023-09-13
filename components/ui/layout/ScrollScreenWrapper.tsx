import { ScrollView, StyleSheet } from "react-native";
import { FC, PropsWithChildren } from "react";
import ScreenWrapper from "./ScreenWrapper";

const ScrollScreenWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollWrapper}
      alwaysBounceVertical={false}
    >
      <ScreenWrapper>{children}</ScreenWrapper>
    </ScrollView>
  );
};

export default ScrollScreenWrapper;

const styles = StyleSheet.create({
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
});

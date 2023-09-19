import { StyleSheet, View } from "react-native";
import React, { FC, PropsWithChildren } from "react";
import ScrollScreenWrapper from "./ScrollScreenWrapper";
import Heading from "../text/Heading";
import CloseButton from "../common/CloseButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import ScreenWrapper from "./ScreenWrapper";

interface Props {
  title: string;
  scrollable?: boolean;
}

const StackScreenWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  scrollable,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Wrapper scrollable={scrollable}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading style={{ fontSize: 24 }}>{title}</Heading>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        {children}
      </View>
    </Wrapper>
  );
};

type WrapperProps = Pick<Props, "scrollable">;

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  scrollable,
}) => {
  if (scrollable) {
    return <ScrollScreenWrapper>{children}</ScrollScreenWrapper>;
  } else {
    return <ScreenWrapper>{children}</ScreenWrapper>;
  }
};

export default StackScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

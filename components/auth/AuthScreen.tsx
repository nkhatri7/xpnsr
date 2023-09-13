import { FC, PropsWithChildren } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import Heading from "../ui/text/Heading";
import ScrollScreenWrapper from "../ui/layout/ScrollScreenWrapper";

interface Props {
  title: string;
}

const AuthScreen: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <ScrollScreenWrapper>
      <KeyboardAvoidingView style={{ justifyContent: "center" }} behavior="position">
        <View style={styles.wrapper}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/xpnsr-logo.png")}
              style={styles.logo}
            />
          </View>
          <Heading style={{ marginVertical: 20 }}>{title}</Heading>
          {children}
        </View>
      </KeyboardAvoidingView>
    </ScrollScreenWrapper>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  logoContainer: {
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  logo: {
    height: "100%",
    width: "100%",
  },
});

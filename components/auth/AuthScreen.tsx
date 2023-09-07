import { FC, PropsWithChildren, useMemo } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Heading from "../ui/text/Heading";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  title: string;
}

const AuthScreen: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollWrapper}
      alwaysBounceVertical={false}
    >
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView behavior="position">
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default AuthScreen;

const styling = (theme: Theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: "center",
  },
  scrollWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
  },
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

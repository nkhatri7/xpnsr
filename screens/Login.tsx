import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { LoginScreenProps } from "../types/navigation";
import AuthScreen from "../components/auth/AuthScreen";
import TextInput from "../components/ui/form/TextInput";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/ui/form/Button";
import Link from "../components/ui/text/Link";

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <AuthScreen title="Sign in">
      <View style={styles.formContainer}>
        <TextInput
          inputMode="email"
          placeholder="Email"
          autoCorrect={false}
          autoComplete="email"
        />
        <TextInput
          inputMode="text"
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{ marginTop: 15 }}>
          <Button>Sign in</Button>
        </View>
        <Link
          onPress={() => navigation.replace("Register")}
          style={{ color: theme.primary }}
        >
          Don't have an account? Sign Up
        </Link>
      </View>
    </AuthScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    rowGap: 10,
    marginTop: 10,
  },
});

import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { RegisterScreenProps } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import TextInput from "../components/ui/form/TextInput";
import Button from "../components/ui/form/Button";
import Link from "../components/ui/text/Link";
import AuthScreen from "../components/auth/AuthScreen";

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <AuthScreen title="Sign up to get started!">
      <View style={styles.formContainer}>
        <TextInput
          inputMode="text"
          placeholder="Name"
          autoComplete="name"
          autoCapitalize="words"
        />
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
        <TextInput
          inputMode="text"
          placeholder="Confirm Password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{ marginTop: 15 }}>
          <Button>Get Started</Button>
        </View>
        <Link
          onPress={() => navigation.replace("Login")}
          style={{ color: theme.primary }}
        >
          Already have an account? Sign In
        </Link>
      </View>
    </AuthScreen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    rowGap: 10,
    marginTop: 10,
  },
});

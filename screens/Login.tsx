import { FC, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { FirebaseError } from "firebase/app";
import { LoginScreenProps } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { FormInputData } from "../types/form";
import { DEFAULT_INPUT_DATA } from "../constants/form";
import { signInUser } from "../utils/auth";
import AuthScreen from "../components/auth/AuthScreen";
import TextInput from "../components/ui/form/TextInput";
import Button from "../components/ui/common/Button";
import Link from "../components/ui/text/Link";
import FormContainer from "../components/auth/FormContainer";

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { setUser } = useAuth();

  const [emailData, setEmailData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [passwordData, setPasswordData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );

  useEffect(() => {
    if (emailData.errorMessage) {
      setEmailData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [emailData.value]);

  useEffect(() => {
    if (passwordData.errorMessage) {
      setPasswordData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [passwordData.value]);

  const handleLogin = async () => {
    const isDataValid = validateData();
    if (isDataValid) {
      try {
        const user = await signInUser(emailData.value, passwordData.value);
        setUser(user);
      } catch (e) {
        // Firebase error is an object
        const error = e as FirebaseError;
        handleSignInError(error.code);
      }
    }
  };

  const handleSignInError = (errorCode: string) => {
    if (errorCode.includes("user-not-found")) {
      setEmailData({
        ...emailData,
        errorMessage: "An account with this email doesn't exist."
      });
    } else if (errorCode.includes("invalid-email")) {
      setEmailData({
        ...emailData,
        errorMessage: "This is an invalid email.",
      });
    } else if (errorCode.includes("wrong-password")) {
      setPasswordData({
        ...passwordData,
        errorMessage: "Password is incorrect"
      });
    } else {
      Alert.alert(
        "Sign-in Failed",
        "We're having issues signing you in. Please try again later"
      );
    }
  };

  const validateData = (): boolean => {
    let isDataValid = true;
    if (!emailData.value) {
      setEmailData({ ...emailData, errorMessage: "Email cannot be empty" });
      isDataValid = false;
    }
    if (!passwordData.value) {
      setPasswordData({
        ...passwordData,
        errorMessage: "Password cannot be empty"
      });
      isDataValid = false;
    }
    return isDataValid;
  };

  return (
    <AuthScreen title="Sign in">
      <FormContainer>
        <TextInput
          inputMode="email"
          placeholder="Email"
          autoCorrect={false}
          autoComplete="email"
          value={emailData.value}
          onChangeText={(text: string) => setEmailData({
            ...emailData,
            value: text.trim(),
          })}
          errorMessage={emailData.errorMessage}
        />
        <TextInput
          inputMode="text"
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          value={passwordData.value}
          onChangeText={(text: string) => setPasswordData({
            ...passwordData,
            value: text.trim(),
          })}
          errorMessage={passwordData.errorMessage}
        />
        <View style={{ marginTop: 15 }}>
          <Button onPress={handleLogin}>Sign in</Button>
        </View>
        <Link
          onPress={() => navigation.replace("Register")}
          style={{ color: theme.primary }}
        >
          Don't have an account? Sign Up
        </Link>
      </FormContainer>
    </AuthScreen>
  );
};

export default LoginScreen;

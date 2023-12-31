import { Alert, View } from "react-native";
import { FC, useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import { RegisterScreenProps } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import { registerUser } from "../utils/auth";
import { FormInputData } from "../types/form";
import { DEFAULT_INPUT_DATA } from "../constants/form";
import TextInput from "../components/ui/form/TextInput";
import Button from "../components/ui/common/Button";
import Link from "../components/ui/text/Link";
import AuthScreen from "../components/auth/AuthScreen";
import FormContainer from "../components/auth/FormContainer";

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const [nameData, setNameData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [emailData, setEmailData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [passwordData, setPasswordData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [
    confirmedPasswordData,
    setConfirmedPasswordData
  ] = useState<FormInputData<string>>(DEFAULT_INPUT_DATA);


  useEffect(() => {
    if (nameData.errorMessage) {
      setNameData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [nameData.value]);

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

  useEffect(() => {
    if (
      confirmedPasswordData.errorMessage
      && confirmedPasswordData.value === passwordData.value
    ) {
      setConfirmedPasswordData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [passwordData.value, confirmedPasswordData.value]);


  const handleRegistration = async () => {
    // Check if data is valid
    const isDataValid = validateData();
    if (isDataValid) {
      // Register user
      try {
        await registerUser(nameData.value, emailData.value, passwordData.value);
      } catch (e) {
        // Firebase error is an object
        const error = e as FirebaseError;
        handleRegistrationError(error.code);
      }
    }
  };

  const handleRegistrationError = (errorCode: string) => {
    if (errorCode.includes("email-already-in-use")) {
      setEmailData({
        ...emailData,
        errorMessage: "An account with this email already exists.",
      });
    } else {
      Alert.alert(
        "Registration Failed",
        "We're having issues creating your account. Please try again later.",
      );
    }
  };

  const validateData = (): boolean => {
    let isDataValid = true;
    if (!nameData.value.trim()) {
      setNameData({ ...nameData, errorMessage: "Name cannot be empty" });
      isDataValid = false;
    }
    if (!emailData.value) {
      setEmailData({ ...emailData, errorMessage: "Email cannot be empty" });
      isDataValid = false;
    }
    if (passwordData.value.trim().length < 6) {
      setPasswordData({
        ...passwordData,
        errorMessage: "Your password must be at least 6 characters",
      });
      isDataValid = false;
    }
    if (confirmedPasswordData.value !== passwordData.value) {
      setConfirmedPasswordData({
        ...confirmedPasswordData,
        errorMessage: "Passwords must match",
      });
      isDataValid = false;
    }
    return isDataValid;
  };

  return (
    <AuthScreen title="Sign up to get started!">
      <FormContainer>
        <TextInput
          inputMode="text"
          placeholder="Name"
          autoComplete="name"
          autoCapitalize="words"
          value={nameData.value}
          onChangeText={(text: string) => setNameData({
            ...nameData,
            value: text,
          })}
          errorMessage={nameData.errorMessage}
        />
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
        <TextInput
          inputMode="text"
          placeholder="Confirm Password"
          autoCorrect={false}
          secureTextEntry={true}
          value={confirmedPasswordData.value}
          onChangeText={(text: string) => setConfirmedPasswordData({
            ...confirmedPasswordData,
            value: text.trim(),
          })}
          errorMessage={confirmedPasswordData.errorMessage}
        />
        <View style={{ marginTop: 15 }}>
          <Button onPress={handleRegistration}>Get Started</Button>
        </View>
        <Link
          onPress={() => navigation.replace("Login")}
          style={{ color: theme.primary }}
        >
          Already have an account? Sign In
        </Link>
      </FormContainer>
    </AuthScreen>
  );
};

export default RegisterScreen;

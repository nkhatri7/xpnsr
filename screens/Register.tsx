import { View } from "react-native";
import { FC, useEffect, useState } from "react";
import { RegisterScreenProps } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
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
  const { setUser } = useAuth();

  const [nameData, setNameData] = useState<FormInputData>(DEFAULT_INPUT_DATA);
  const [emailData, setEmailData] = useState<FormInputData>(DEFAULT_INPUT_DATA);
  const [passwordData, setPasswordData] = useState<FormInputData>(
    DEFAULT_INPUT_DATA
  );
  const [
    confirmedPasswordData,
    setConfirmedPasswordData
  ] = useState<FormInputData>(DEFAULT_INPUT_DATA);


  useEffect(() => {
    if (nameData.errorMessage && nameData.value.trim()) {
      setNameData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [nameData]);

  useEffect(() => {
    if (emailData.errorMessage && emailData.value) {
      setEmailData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [emailData]);

  useEffect(() => {
    if (passwordData.errorMessage && passwordData.value) {
      setPasswordData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [passwordData]);

  useEffect(() => {
    if (
      confirmedPasswordData.errorMessage
      && confirmedPasswordData.value === passwordData.value
    ) {
      setConfirmedPasswordData((data) => ({ ...data, errorMessage: "" }));
    }
  }, [passwordData, confirmedPasswordData]);


  const handleRegistration = async () => {
    // Check if data is valid
    const isDataValid = validateData();
    if (isDataValid) {
      // Register user
      const user = await registerUser(
        nameData.value,
        emailData.value,
        passwordData.value
      );
      setUser(user);
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
    if (!passwordData.value) {
      setPasswordData({
        ...passwordData,
        errorMessage: "Password cannot be empty"
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

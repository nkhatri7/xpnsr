import { FC, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { EditProfileScreenProps } from "../types/navigation";
import StackScreenWrapper from "../components/ui/layout/StackScreenWrapper";
import TextInput from "../components/ui/form/TextInput";
import { useAuth } from "../context/AuthContext";
import { FormInputData } from "../types/form";
import Text from "../components/ui/text/Text";
import Button from "../components/ui/common/Button";
import { updateEmail, updateProfile } from "firebase/auth";

const EditProfileScreen: FC<EditProfileScreenProps> = () => {
  const { user } = useAuth();
  if (!user || !user.displayName || !user.email) {
    return null;
  }

  const [name, setName] = useState<string>(user.displayName);
  const [emailData, setEmailData] = useState<FormInputData<string>>({
    value: user.email,
    errorMessage: "",
  });

  const handleUpdateName = async () => {
    try {
      await updateProfile(user, { displayName: name });
      Alert.alert("Name Changed", "We've successfully changed your name.");
    } catch (e) {
      Alert.alert(
        "Error",
        "We ran into an error updating your display name. Please try again later."
      );
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(user, emailData.value);
      Alert.alert("Email Changed", "We've successfully changed your email.");
    } catch (e) {
      Alert.alert(
        "Error",
        "We ran into an error updating your display name. Please try again later."
      );
    }
  };

  return (
    <StackScreenWrapper title="Edit your profile" scrollable={true}>
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.formFieldLabel}>Name</Text>
          <TextInput
            inputMode="text"
            placeholder="Change Name"
            value={name}
            onChangeText={(value) => setName(value)}
            errorMessage=""
          />
          <View style={styles.formFieldSubmitContainer}>
            <Button
              disabled={name.length === 0 || name === user.displayName}
              onPress={handleUpdateName}
            >
              Update Name
            </Button>
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formFieldLabel}>Email</Text>
          <TextInput
            inputMode="text"
            placeholder="Change Email"
            value={emailData.value}
            onChangeText={(value) => setEmailData({ ...emailData, value })}
            errorMessage={emailData.errorMessage}
          />
          <View style={styles.formFieldSubmitContainer}>
            <Button
              disabled={
                emailData.value.length === 0 || emailData.value === user.email
              }
              onPress={handleUpdateEmail}
            >
              Update Email
            </Button>
          </View>
        </View>
      </View>
    </StackScreenWrapper>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    flex: 1,
    gap: 50,
  },
  formField: {
    gap: 5,
  },
  formFieldLabel: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  formFieldSubmitContainer: {
    maxWidth: 200,
    marginTop: 10,
  },
});

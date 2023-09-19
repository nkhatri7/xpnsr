import { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import SettingsButton from "./SettingsButton";
import { colourVariables } from "../../constants/colours";

const SignOutButton: FC = () => {
  return (
    <SettingsButton text="Sign Out" onPress={() => signOut(auth)}>
      <Ionicons name="exit-outline" color={colourVariables.error} size={24} />
    </SettingsButton>
  );
};

export default SignOutButton;

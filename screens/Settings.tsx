import { StyleSheet, View } from "react-native";
import ScrollScreenWrapper from "../components/ui/layout/ScrollScreenWrapper";
import ProfilePreview from "../components/settings/ProfilePreview";
import ThemeToggle from "../components/settings/ThemeToggle";
import SignOutButton from "../components/settings/SignOutButton";

const SettingsScreen = () => {
  return (
    <ScrollScreenWrapper>
      <View style={styles.container}>
        <ProfilePreview />
        <View style={styles.settingsBottomContainer}>
          <ThemeToggle />
          <SignOutButton />
        </View>
      </View>
    </ScrollScreenWrapper>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: "space-between",
  },
  settingsBottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
});

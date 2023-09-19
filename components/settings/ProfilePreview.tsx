import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { RootStackParamList } from "../../types/navigation";
import { Theme } from "../../constants/colours";
import Text from "../ui/text/Text";
import Link from "../ui/text/Link";

const ProfilePreview: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCircle}>
        <Text style={styles.profileCircleText}>
          {user.displayName?.charAt(0)}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Link
        style={styles.editProfileLink}
        onPress={() => navigation.navigate("EditProfile")}
      >
        Edit Profile
      </Link>
    </View>
  );
};

export default ProfilePreview;

const styling = (theme: Theme) => StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },
  profileCircle: {
    height: 80,
    width: 80,
    borderRadius: 1000,
    backgroundColor: theme.card,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCircleText: {
    fontFamily: "Roboto-Medium",
    fontSize: 32,
  },
  detailsContainer: {
    alignItems: "center",
    gap: 2,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  },
  email: {
    color: theme.placeholder,
  },
  editProfileLink: {
    fontFamily: "Roboto-Medium",
    color: theme.primary,
  },
});
import { Pressable, StyleSheet, View } from "react-native";
import { Theme } from "../../constants/colours";
import { useTheme } from "../../context/ThemeContext";
import { useMemo } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";

const AddExpenseButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => navigation.navigate("AddExpense")}
      android_ripple={{ color: theme.primaryAlt }}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="add" size={32} color="white" />
      </View>
    </Pressable>
  );
};

export default AddExpenseButton;

const styling = (theme: Theme) => StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.primary,
    borderRadius: 100,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 1,
    shadowColor: theme.primaryAlt,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },
  buttonPressed: {
    backgroundColor: theme.primaryAlt
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
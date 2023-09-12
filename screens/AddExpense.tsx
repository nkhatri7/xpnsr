import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/ui/layout/ScreenWrapper";
import Heading from "../components/ui/text/Heading";
import CloseButton from "../components/ui/common/CloseButton";
import { FC } from "react";
import { AddExpenseScreenProps } from "../types/navigation";
import AddExpenseForm from "../components/expenses/AddExpenseForm";

const AddExpenseScreen: FC<AddExpenseScreenProps> = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading style={{ fontSize: 24 }}>Add an expense</Heading>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        <AddExpenseForm />
      </View>
    </ScreenWrapper>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }
});

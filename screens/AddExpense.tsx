import { StyleSheet, View } from "react-native";
import { FC } from "react";
import { AddExpenseScreenProps } from "../types/navigation";
import ScrollScreenWrapper from "../components/ui/layout/ScrollScreenWrapper";
import Heading from "../components/ui/text/Heading";
import CloseButton from "../components/ui/common/CloseButton";
import AddExpenseForm from "../components/expenses/AddExpenseForm";

const AddExpenseScreen: FC<AddExpenseScreenProps> = ({ navigation }) => {
  return (
    <ScrollScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Heading style={{ fontSize: 24 }}>Add an expense</Heading>
          <CloseButton onPress={() => navigation.goBack()} />
        </View>
        <AddExpenseForm />
      </View>
    </ScrollScreenWrapper>
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
  },
});

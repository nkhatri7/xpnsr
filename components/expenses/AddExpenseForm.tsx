import { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FormInputData } from "../../types/form";
import { ExpenseCategory } from "../../types/expenses";
import { DEFAULT_INPUT_DATA } from "../../constants/form";
import TextInput from "../ui/form/TextInput";
import Select from "../ui/form/Select";
import DateInput from "../ui/form/DateInput";
import Button from "../ui/common/Button";
import { createExpense } from "../../utils/expenses";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { useAuth } from "../../context/AuthContext";

const expenseCategories: string[] = Object.values(ExpenseCategory);

const AddExpenseForm: FC = () => {
  const [nameData, setNameData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [amountData, setAmountData] = useState<FormInputData<string>>(
    DEFAULT_INPUT_DATA
  );
  const [
    categoryData,
    setCategoryData
  ] = useState<FormInputData<string | null>>({
    value: null,
    errorMessage: "",
  });
  const [date, setDate] = useState<Date>(new Date());

  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (nameData.errorMessage && nameData.value.trim()) {
      setNameData((nameData) => ({ ...nameData, errorMessage: "" }));
    }
  }, [nameData]);

  useEffect(() => {
    if (amountData.errorMessage && getAmountValue(amountData.value)) {
      setAmountData((amountData) => ({ ...amountData, errorMessage: "" }));
    }
  }, [amountData]);

  useEffect(() => {
    if (categoryData.errorMessage && categoryData.value) {
      setCategoryData((categoryData) => ({
        ...categoryData,
        errorMessage: "",
      }));
    }
  }, [categoryData]);

  const handleAddExpense = async () => {
    const isDataValid = validateData();
    if (!isDataValid) {
      return;
    }
    const category = enumFromStringValue(
      ExpenseCategory,
      categoryData.value ?? ""
    );
    if (!category) {
      setCategoryData({ ...categoryData, errorMessage: "Invalid category" });
      return;
    }

    const isSuccessful = await createExpense({
      userId: user?.uid ?? "",
      name: nameData.value,
      amount: getAmountValue(amountData.value),
      category,
      date: date,
    });
    if (isSuccessful) {
      navigation.navigate("Root", { screen: "Expenses" });
    } else {
      Alert.alert(
        "Error",
        "There was an issue with adding your expense, please try again."
      );
    }
  };

  const validateData = (): boolean => {
    let isDataValid = true;

    if (!nameData.value.trim()) {
      setNameData({ ...nameData, errorMessage: "Name cannot be empty" });
      isDataValid = false;
    }
    if (!getAmountValue(amountData.value)) {
      setAmountData({
        ...amountData,
        errorMessage: "Amount must be valid and more than 0"
      });
      isDataValid = false;
    }
    if (!categoryData.value) {
      setCategoryData({
        ...categoryData,
        errorMessage: "Must select expense category",
      });
      isDataValid = false;
    }

    return isDataValid;
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        inputMode="text"
        placeholder="Expense name"
        value={nameData.value}
        onChangeText={(value) => setNameData({ ...nameData, value })}
        errorMessage={nameData.errorMessage}
      />
      <TextInput
        inputMode="decimal"
        placeholder="Amount"
        value={amountData.value}
        onChangeText={(value) => setAmountData({ ...amountData, value })}
        errorMessage={amountData.errorMessage}
      />
      <Select
        data={expenseCategories}
        placeholder="Select category"
        selectedValue={categoryData.value}
        setSelected={(value) => setCategoryData({ ...categoryData, value })}
        errorMessage={categoryData.errorMessage}
      />
      <DateInput date={date} setDate={setDate} />
      <View style={styles.submitButtonContainer}>
        <Button onPress={handleAddExpense}>Add Expense</Button>
      </View>
    </View>
  );
};

export default AddExpenseForm;

// Solution from https://stackoverflow.com/questions/17380845/how-do-i-convert-a-string-to-enum-in-typescript
function enumFromStringValue<T> (
  enm: { [s: string]: T},
  value: string
): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}

const getAmountValue = (amount: string): number => {
  const dotIndex = amount.indexOf(".");
  const value = dotIndex !== -1 && dotIndex === amount.length - 1
    ? parseFloat(amount.substring(0, dotIndex))
    : parseFloat(amount);
  return value;
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50,
    rowGap: 15,
  },
  submitButtonContainer: {
    maxWidth: 150,
    marginTop: 20,
  },
});

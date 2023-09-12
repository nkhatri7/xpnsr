import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FormInputData } from "../../types/form";
import { ExpenseCategory } from "../../types/expenses";
import { DEFAULT_INPUT_DATA } from "../../constants/form";
import TextInput from "../ui/form/TextInput";
import Select from "../ui/form/Select";
import DateInput from "../ui/form/DateInput";
import Button from "../ui/common/Button";

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

  const handleAddExpense = () => {
    const isDataValid = validateData();
    if (isDataValid) {
      // add expense
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

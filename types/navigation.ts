import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Root: NavigatorScreenParams<RootTabsParamList>;
  AddExpense: undefined;
  SortExpenses: undefined;
  FilterExpenses: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  Expenses: undefined;
};

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type ExpensesScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  "Expenses"
>;

export type AddExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddExpense"
>;

export type SortExpensesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "SortExpenses"
>;

export type FilterExpensesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "FilterExpenses"
>;

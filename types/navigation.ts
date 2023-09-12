import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Root: NavigatorScreenParams<RootTabsParamList>;
  AddExpense: undefined;
};

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type AddExpenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddExpense"
>;

export type RootTabsParamList = {
  Home: undefined;
  Expenses: undefined;
};

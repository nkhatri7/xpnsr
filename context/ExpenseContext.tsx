import { FC, PropsWithChildren, createContext, useContext, useState } from "react";
import { Expense } from "../types/expenses";
import { getUserExpenses } from "../utils/expenses";

interface ExpenseContextType {
  expenses: Expense[];
  updateExpenses: (uid: string) => Promise<void>;
  loading: boolean;
  hasError: boolean;
}

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  updateExpenses: async () => {},
  loading: false,
  hasError: false,
});

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const fetchExpenses = async (uid: string) => {
    setHasError(false);
    try {
      setLoading(true);
      const expenses = await getUserExpenses(uid);
      setExpenses(expenses);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setHasError(true);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        updateExpenses: fetchExpenses,
        loading,
        hasError,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Expense, ExpenseSortOption } from "../types/expenses";
import { getUserExpenses, sortExpenses } from "../utils/expenses";

interface ExpenseContextType {
  expenses: Expense[];
  updateExpenses: (uid: string) => Promise<void>;
  sortOption: ExpenseSortOption,
  setSortOption: Dispatch<SetStateAction<ExpenseSortOption>>;
  sortedExpenses: Expense[];
  setSortedExpenses: Dispatch<SetStateAction<Expense[]>>;
  loading: boolean;
  hasError: boolean;
}

const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  updateExpenses: async () => {},
  sortOption: ExpenseSortOption.MOST_RECENT,
  setSortOption: () => {},
  sortedExpenses: [],
  setSortedExpenses: () => {},
  loading: false,
  hasError: false,
});

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sortOption, setSortOption] = useState<ExpenseSortOption>(
    ExpenseSortOption.MOST_RECENT
  );
  const [sortedExpenses, setSortedExpenses] = useState<Expense[]>(expenses);
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

  useEffect(() => {
    setSortedExpenses(sortExpenses(expenses, sortOption));
  }, [expenses, sortOption]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        updateExpenses: fetchExpenses,
        sortOption,
        setSortOption,
        sortedExpenses,
        setSortedExpenses,
        loading,
        hasError,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

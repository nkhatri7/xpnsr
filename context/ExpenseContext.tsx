import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Expense,
  ExpenseDateFilterOption,
  ExpenseFilter,
  ExpenseSortOption,
} from "../types/expenses";
import {
  filterExpenses,
  getUserExpenses,
  sortExpenses,
} from "../utils/expenses";

interface ExpenseContextType {
  expenses: Expense[];
  updateExpenses: (uid: string) => Promise<void>;
  filter: ExpenseFilter;
  setFilter: Dispatch<SetStateAction<ExpenseFilter>>;
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
  filter: { categories: [], date: ExpenseDateFilterOption.NONE },
  setFilter: () => {},
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
  const [filter, setFilter] = useState<ExpenseFilter>({
    categories: [],
    date: ExpenseDateFilterOption.NONE,
  });
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);
  const [sortOption, setSortOption] = useState<ExpenseSortOption>(
    ExpenseSortOption.MOST_RECENT
  );
  const [sortedExpenses, setSortedExpenses] = useState<Expense[]>(
    filteredExpenses
  );
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
    setFilteredExpenses(filterExpenses(expenses, filter));
  }, [expenses, filter]);

  useEffect(() => {
    setSortedExpenses(sortExpenses(filteredExpenses, sortOption));
  }, [filteredExpenses, sortOption]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        updateExpenses: fetchExpenses,
        filter,
        setFilter,
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

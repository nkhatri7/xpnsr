import { app } from "../firebase/config";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import {
  Expense,
  ExpenseCategory,
  ExpenseDateFilterOption,
  ExpenseFilter,
  ExpenseSortOption,
  FirebaseExpense,
} from "../types/expenses";
import { Ionicons } from "@expo/vector-icons";

const database = getDatabase(app);
const dbRef = ref(database, "expenses");

/**
 * Creates an expense in the Firebase Database with the given expense data.
 * @param expenseData An {@link ExpenseFormData} object.
 * @returns `true` if the expense was successfully added to the database,
 * `false` otherwise.
 */
export const createExpense = async (
  expenseData: FirebaseExpense
): Promise<boolean> => {
  try {
    const uniqueExpenseRef = push(dbRef);
    await set(uniqueExpenseRef, expenseData);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 * Fetches all the expenses for the user with the given `uid`.
 * @param uid The ID of the current user.
 * @returns An array of expenses for the user.
 */
export const getUserExpenses = async (uid: string): Promise<Expense[]> => {
  const expensesQuery = query(dbRef, orderByChild("userId"), equalTo(uid));
  const snapshot = await get(expensesQuery);

  if (snapshot.exists()) {
    const userExpenses: Expense[] = [];
    snapshot.forEach((childSnapshot) => {
      const expenseId = childSnapshot.key;
      const expenseData: FirebaseExpense = childSnapshot.val();
      const expense: Expense = {
        ...expenseData,
        id: expenseId,
        date: new Date(expenseData.date),
      };
      userExpenses.push(expense);
    });
    return userExpenses;
  } else {
    return [];
  }
};

/**
 * Finds the icon name for the given category.
 * @param category An {@link ExpenseCategory}.
 * @returns An icon name.
 */
export const getCategoryIconName = (
  category: ExpenseCategory
): keyof typeof Ionicons["glyphMap"] => {
  if (category === ExpenseCategory.BUSINESS) return "business";
  if (category === ExpenseCategory.DONATION) return "gift-outline";
  if (category === ExpenseCategory.EDUCATION) return "school-outline";
  if (category === ExpenseCategory.ENTERTAINMENT) return "film-outline";
  if (category === ExpenseCategory.FOOD) return "fast-food-outline";
  if (category === ExpenseCategory.GROCERIES) return "nutrition-outline";
  if (category === ExpenseCategory.HEALTH) return "fitness-outline";
  if (category === ExpenseCategory.HOME) return "home-outline";
  if (category === ExpenseCategory.INVESTMENT) return "cash-outline";
  if (category === ExpenseCategory.OTHER) return "help";
  if (category === ExpenseCategory.SHOPPING) return "cart-outline";
  if (category === ExpenseCategory.TRANSPORT) return "car-outline";
  if (category === ExpenseCategory.TRAVEL) return "airplane-outline";

  return "help";
};

interface MonthlyStats {
  spend: number;
  categoryStats: CategoryStats[];
}

interface CategoryStats {
  category: ExpenseCategory;
  count: number;
  totalSpend: number;
}

/**
 * Gets expense stats for the current month.
 * @param expenses An array of {@link Expense} objects.
 * @returns A {@link MonthlyStats} object with the stats for the current month.
 */
export const getCurrentMonthStats = (expenses: Expense[]): MonthlyStats => {
  const currentMonthExpenses = filterExpensesByDate(
    expenses,
    ExpenseDateFilterOption.THIS_MONTH
  );
  const totalSpend = expenses.reduce((accumulator, currentExpense) => {
    return accumulator + currentExpense.amount;
  }, 0);
  const categoryStats = getCategoryStats(currentMonthExpenses);
  return { spend: totalSpend, categoryStats };
};

type CategoryData = Record<ExpenseCategory, {
  count: number,
  totalSpend: number
}>;

/**
 * Calculates the count and total spending for each category from the given
 * expenses and sorts the categories by the highest total spend.
 * @param expenses An array of {@link Expense} objects.
 * @returns An array of {@link CategoryStats} objects sorted by total spend.
 */
export const getCategoryStats = (expenses: Expense[]): CategoryStats[] => {
  // Initialise category data
  const categoryData = {} as CategoryData;
  Object.values(ExpenseCategory).forEach((category) => {
    categoryData[category] = { count: 0, totalSpend: 0 };
  });

  // Loop through expenses and add count and total spend to categories
  expenses.forEach((expense) => {
    const { category, amount } = expense;
    if (categoryData[category]) {
      categoryData[category].count++;
      categoryData[category].totalSpend += amount;
    } else {
      categoryData[category] = {
        count: 1,
        totalSpend: amount,
      };
    }
  });

  // Transform data into stats objects and sort by total spend
  const categoryStats = Object.entries(categoryData)
    .map(([category, data]) => ({
      ...data,
      category: category as unknown as ExpenseCategory,
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend);
  return categoryStats;
};

/**
 * Sorts the given expenses array by the given sort type.
 * @param expenses An array of {@link Expense} objects.
 * @param sortType The sort type (see {@link ExpenseSortOption}).
 * @returns A sorted array based on the sort type given.
 */
export const sortExpenses = (
  expenses: Expense[],
  sortOption: ExpenseSortOption
): Expense[] => {
  if (sortOption === ExpenseSortOption.MOST_RECENT) {
    return sortMostRecentExpenses(expenses);
  }
  if (sortOption === ExpenseSortOption.AMOUNT_HIGH_TO_LOW) {
    return sortMostExpensiveExpenses(expenses);
  }
  if (sortOption === ExpenseSortOption.AMOUNT_LOW_TO_HIGH) {
    return sortLeastExpensiveExpenses(expenses);
  }
  // Expenses to be passed in will be default expenses with no sorting
  // It is ordered by oldest by default
  return expenses;
};

/**
 * Sorts the given expenses array by the most recent expenses.
 * @param expenses An array of {@link Expense} objects.
 * @returns An array of expense objects with the most recent ones first.
 */
const sortMostRecentExpenses = (expenses: Expense[]): Expense[] => (
  // Can use reverse as by default it is the oldest expenses first
  [...expenses].reverse()
);

/**
 * Sorts the given expenses array by the most expensive expenses.
 * @param expenses An array of {@link Expense} objects.
 * @returns An array of expense objects with the most expensive ones first.
 */
const sortMostExpensiveExpenses = (expenses: Expense[]): Expense[] => (
  [...expenses].sort((a, b) => b.amount - a.amount)
);

/**
 * Sorts the given expenses array by the least expensive expenses.
 * @param expenses An array of {@link Expense} objects.
 * @returns An array of expense objects with the least expensive ones first.
 */
const sortLeastExpensiveExpenses = (expenses: Expense[]): Expense[] => (
  [...expenses].sort((a, b) => a.amount - b.amount)
);

/**
 * Filters the given expenses by the selected filters.
 * @param expenses An array of {@link Expense} objects.
 * @param filter An {@link ExpenseFilter} object with filters for categories
 * and date.
 * @returns A filtered array of expense objects based on the passed filter.
 */
export const filterExpenses = (
  expenses: Expense[],
  filter: ExpenseFilter
): Expense[] => {
  const categoryFilteredExpenses = filterExpensesByCategory(
    expenses,
    filter.categories
  );
  return filterExpensesByDate(categoryFilteredExpenses, filter.date);
};

/**
 * Filters the given expenses by their categories. Checks if the expense
 * category is in the selected filtered categories.
 * @param expenses An array of {@link Expense} objects.
 * @param categories The filtered categories.
 * @returns A filtered array of expense objects based on the given categories.
 */
const filterExpensesByCategory = (
  expenses: Expense[],
  categories: ExpenseCategory[]
): Expense[] => {
  if (categories.length === 0) {
    return expenses;
  }
  return [...expenses].filter((expense) => (
    categories.includes(expense.category)
  ));
};

/**
 * Filters the given expenses by the given date filter.
 * @param expenses An array of {@link Expense} objects.
 * @param dateFilter A date filter.
 * @returns A filtered array of expense objects based on the date filter.
 */
const filterExpensesByDate = (
  expenses: Expense[],
  dateFilter: ExpenseDateFilterOption
): Expense[] => {
  const expensesArray = [...expenses];
  if (dateFilter === ExpenseDateFilterOption.TODAY) {
    return expensesArray.filter((expense) => isToday(expense.date));
  }
  if (dateFilter === ExpenseDateFilterOption.PAST_WEEK) {
    return expensesArray.filter((expense) => isPastWeek(expense.date));
  }
  if (dateFilter === ExpenseDateFilterOption.THIS_MONTH) {
    return expensesArray.filter((expense) => isThisMonth(expense.date));
  }
  if (dateFilter === ExpenseDateFilterOption.THIS_YEAR) {
    return expensesArray.filter((expense) => isThisYear(expense.date));
  }
  return expenses;
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

const isPastWeek = (date: Date): boolean => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.floor(
    (today.getTime() - date.getTime()) / oneDay
  );
  return daysDifference <= 7;
};

const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  return isThisYear(date) && date.getMonth() === today.getMonth();
};

const isThisYear = (date: Date): boolean => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};

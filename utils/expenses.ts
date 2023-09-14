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

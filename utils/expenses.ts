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
import { Expense, ExpenseCategory, FirebaseExpense } from "../types/expenses";
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
  if (category === ExpenseCategory.DONATION) return "gift";
  if (category === ExpenseCategory.EDUCATION) return "school";
  if (category === ExpenseCategory.ENTERTAINMENT) return "film";
  if (category === ExpenseCategory.FOOD) return "fast-food";
  if (category === ExpenseCategory.GROCERIES) return "nutrition";
  if (category === ExpenseCategory.HEALTH) return "fitness";
  if (category === ExpenseCategory.HOME) return "home";
  if (category === ExpenseCategory.INVESTMENT) return "cash";
  if (category === ExpenseCategory.OTHER) return "help-circle";
  if (category === ExpenseCategory.SHOPPING) return "cart";
  if (category === ExpenseCategory.TRANSPORT) return "car";
  if (category === ExpenseCategory.TRAVEL) return "airplane";

  return "help-circle";
};

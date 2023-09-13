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
import { Expense, FirebaseExpense } from "../types/expenses";

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

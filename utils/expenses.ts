import { app } from "../firebase/config";
import { getDatabase, push, ref, set } from "firebase/database";
import { ExpenseFormData } from "../types/expenses";

const database = getDatabase(app);

/**
 * Creates an expense in the Firebase Database with the given expense data.
 * @param expenseData An {@link ExpenseFormData} object.
 * @returns `true` if the expense was successfully added to the database,
 * `false` otherwise.
 */
export const createExpense = async (
  expenseData: ExpenseFormData
): Promise<boolean> => {
  try {
    const dbRef = ref(database, "expenses");
    const uniqueExpenseRef = push(dbRef);
    await set(uniqueExpenseRef, expenseData);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

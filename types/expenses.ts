export interface Expense {
  id: string;
  userId: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}

export type ExpenseFormData = Omit<Expense, "id">;

export enum ExpenseCategory {
  BUSINESS = "Business",
  DONATION = "Donation",
  EDUCATION = "Education",
  FOOD = "Food & Drinks",
  GROCERIES = "Groceries",
  HEALTH = "Health",
  HOME = "Home",
  INVESTMENT = "Investment",
  OTHER = "Other",
  SHOPPING = "Shopping",
  TRANSPORT = "Transport",
  TRAVEL = "Travel",
  UTILITIES = "Utilities",
}

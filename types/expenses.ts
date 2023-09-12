export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}

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

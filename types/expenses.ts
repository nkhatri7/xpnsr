export interface Expense {
  id: string;
  userId: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}

export interface FirebaseExpense {
  userId: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export enum ExpenseCategory {
  BUSINESS = "Business",
  DONATION = "Donation",
  EDUCATION = "Education",
  ENTERTAINMENT = "Entertainment",
  FOOD = "Food & Drinks",
  GROCERIES = "Groceries",
  HEALTH = "Health",
  HOME = "Home",
  INVESTMENT = "Investment",
  OTHER = "Other",
  SHOPPING = "Shopping",
  TRANSPORT = "Transport",
  TRAVEL = "Travel",
}

export enum ExpenseSortOption {
  MOST_RECENT = "Most recent",
  OLDEST = "Oldest",
  AMOUNT_HIGH_TO_LOW = "Highest to lowest (amount)",
  AMOUNT_LOW_TO_HIGH = "Lowest to highest (amount)",
}

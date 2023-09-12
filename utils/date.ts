const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCurrentMonthName = (): string => {
  const currentDate = new Date();
  return MONTH_NAMES[currentDate.getMonth()];
};

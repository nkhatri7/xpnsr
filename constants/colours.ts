export interface Theme {
  primary: string;
  primaryAlt: string;
  background: string;
  text: string;
  border: string;
  error: string;
  card: string;
  placeholder: string;
}

export const colourVariables = {
  primary: "#965FDC",
  primaryLight: "#B27EEF",
  primaryDark: "#5C22A7",
  error: "#D15151",
};

export const lightTheme: Theme = {
  primary: colourVariables.primary,
  primaryAlt: colourVariables.primaryLight,
  background: "#FFFFFF",
  text: "#111111",
  border: "#CCCCCC",
  error: colourVariables.error,
  card: "#F0F0F0",
  placeholder: "#A0A0A0",
};

export const darkTheme: Theme = {
  primary: colourVariables.primary,
  primaryAlt: colourVariables.primaryDark,
  background: "#1E1E1E",
  text: "#FAFAFA",
  border: "#CCCCCC",
  error: colourVariables.error,
  card: "#272727",
  placeholder: "#CCCCCC",
};

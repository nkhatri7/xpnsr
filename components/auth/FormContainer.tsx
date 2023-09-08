import { StyleSheet, View } from "react-native";
import { FC, PropsWithChildren } from "react";

const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.formContainer}>{children}</View>;
};

export default FormContainer;

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    rowGap: 10,
    marginTop: 10,
  },
});

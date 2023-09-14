import { StyleSheet, View } from "react-native";
import { Dispatch, FC, SetStateAction } from "react";
import { useTheme } from "../../../context/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import Text from "../text/Text";

interface Props {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const DateInput: FC<Props> = ({ date, setDate }) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>Date</Text>
      <DateTimePicker
        mode="date"
        display="default"
        value={date}
        onChange={(event, date) => {
          if (date) {
            setDate(date);
          }
        }}
        style={{ marginLeft: -10 }}
        accentColor={theme.primary}
        themeVariant={isDarkMode ? "dark" : "light"}
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});

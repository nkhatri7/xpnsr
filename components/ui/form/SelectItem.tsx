import { FC, useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";
import Text from "../text/Text";

interface Props {
  value: any;
  selectedValue: any;
  onPress: (value: any) => void;
}

const SelectItem: FC<Props> = ({ value, selectedValue, onPress }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.dropdownItem,
        value === selectedValue && styles.selectedDropdownItem,
        pressed && styles.dropdownItemPressed,
      ]}
      android_ripple={{ color: theme.card }}
      onPress={onPress.bind(this, value)}
    >
      <Text
        style={[
          styles.dropdownItemText,
          value === selectedValue && styles.selectedDropdownItemText
        ]}
      >
        {value}
      </Text>
    </Pressable>
  );
};

export default SelectItem;

const styling = (theme: Theme) => StyleSheet.create({
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: theme.text,
  },
  dropdownItemPressed: {
    backgroundColor: theme.card,
  },
  selectedDropdownItem: {
    backgroundColor: theme.primary,
  },
  selectedDropdownItemText: {
    fontFamily: "Roboto-Medium",
    color: "white",
  },
});

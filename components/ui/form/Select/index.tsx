import { FC, useEffect, useMemo, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { Theme } from "../../../../constants/colours";
import { useTheme } from "../../../../context/ThemeContext";
import AnimatedArrow from "../../common/AnimatedArrow";
import SelectItem from "./SelectItem";
import Text from "../../text/Text";

interface Props {
  data: any[];
  placeholder: string;
  selectedValue: any;
  setSelected: (value: any) => void;
  errorMessage: string;
}

const Select: FC<Props> = ({
  data,
  placeholder,
  selectedValue,
  setSelected,
  errorMessage
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);
  const [isSelectOpen, setSelectOpen] = useState<boolean>(false);

  if (
    Platform.OS === "android"
    && UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isSelectOpen]);

  const handleItemSelect = (value: any) => {
    setSelected(value);
    setSelectOpen(false);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.selectContainer}>
        <Pressable
          style={[
            styles.selectTrigger,
            isSelectOpen && { borderColor: theme.primary },
            errorMessage !== "" && { borderColor: theme.error },
          ]}
          onPress={() => setSelectOpen((prev) => !prev)}
        >
          <Text
            style={[
              styles.selectTriggerText,
              !selectedValue && { color: theme.placeholder }
            ]}
          >
            {selectedValue ?? placeholder}
          </Text>
          <AnimatedArrow isOpen={isSelectOpen} />
        </Pressable>
        {isSelectOpen && (
          <ScrollView
            style={[styles.dropdown, isSelectOpen && styles.dropdownOpen]}
          >
            {data.map((value, index) => (
              <SelectItem
                key={index}
                value={value}
                selectedValue={selectedValue}
                onPress={(value) => handleItemSelect(value)}
              />
            ))}
          </ScrollView>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Select;

const styling = (theme: Theme) => StyleSheet.create({
  inputContainer: {
    width: "100%",
    rowGap: 2,
  },
  selectContainer: {
    position: "relative",
    width: "100%",
  },
  selectTrigger: {
    backgroundColor: theme.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectTriggerText: {
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: theme.background,
    width: "100%",
    overflow: "hidden",
    marginTop: 2,
  },
  dropdownOpen: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
  },
  errorMessage: {
    color: theme.error,
    fontSize: 13,
  },
});

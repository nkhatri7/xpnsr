import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import Text from "../text/Text";
import AnimatedArrow from "./AnimatedArrow";

interface Props {
  title: string;
  subtitle?: string;
  isOpenByDefault?: boolean;
}

const Accordion: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  subtitle,
  isOpenByDefault,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  const [isOpen, setIsOpen] = useState<boolean>(isOpenByDefault ?? false);

  if (
    Platform.OS === "android"
    && UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isOpen]);

  return (
    <View>
      <Pressable
        style={[styles.header, !isOpen && styles.headerClosed]}
        onPress={() => setIsOpen(prev => !prev)}
      >
        <View style={{ rowGap: 5, }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <AnimatedArrow isOpen={isOpen} />
      </Pressable>
      {isOpen && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
};

export default Accordion;

const styling = (theme: Theme) => StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
  },
  headerClosed: {
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 13,
    color: theme.placeholder,
  },
  accordionBody: {
    paddingHorizontal: 10,
  },
});

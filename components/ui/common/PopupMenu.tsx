import { Dimensions, Modal, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { FC, useMemo, useRef, useState } from "react";
import { Theme } from "../../../constants/colours";
import { useTheme } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import Text from "../text/Text";

interface Props {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  options: PopupOption[];
  iconName?: keyof typeof Ionicons["glyphMap"];
  triggerText?: string;
  triggerStyle?: StyleProp<ViewStyle>;
  triggerTextStyle?: StyleProp<TextStyle>;
}

interface PopupPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PopupOption {
  text: string;
  action: () => void;
}

const PopupMenu: FC<Props> = ({
  position,
  options,
  iconName,
  triggerText,
  triggerStyle,
  triggerTextStyle,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => styling(theme), [theme]);

  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const triggerRef = useRef<View>(null);

  const openPopup = () => {
    if (triggerRef.current) {
      // eslint-disable-next-line max-params
      triggerRef.current.measureInWindow((x, y, width, height) => {
        if (position === "top-left") {
          setPopupPosition({
            ...popupPosition,
            bottom: Dimensions.get("window").height - y + 5,
            right: Dimensions.get("window").width - x - width,
          });
        } else if (position === "top-right") {
          setPopupPosition({
            ...popupPosition,
            bottom: y - 5,
            left: x,
          });
        } else if (position === "bottom-left") {
          setPopupPosition({
            ...popupPosition,
            top: y + height + 5,
            right: Dimensions.get("window").width - x - width,
          });
        } else {
          setPopupPosition({ ...popupPosition, top: y + height + 5, left: x });
        }
        setPopupOpen(true);
      });
    }
  };

  const getPopupPositionStyle = (): StyleProp<ViewStyle> => {
    if (position === "top-left") {
      return { bottom: popupPosition.bottom, right: popupPosition.right };
    } else if (position === "top-right") {
      return { bottom: popupPosition.bottom, left: popupPosition.left };
    } else if (position === "bottom-left") {
      return { top: popupPosition.top, right: popupPosition.right };
    } else {
      return { top: popupPosition.top, left: popupPosition.left };
    }
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          styles.trigger,
          triggerText ? styles.triggerWithText : styles.triggerWithIcon,
          pressed && styles.triggerPressed,
          triggerStyle,
        ]}
        ref={triggerRef}
        onPress={openPopup}
      >
        {triggerText ? (
          <Text style={[styles.triggerText, triggerTextStyle]}>
            {triggerText}
          </Text>
        ) : (
          <Ionicons
            name={iconName ?? "ellipsis-vertical"}
            size={18}
            color="white"
          />
        )}
      </Pressable>
      {isPopupOpen && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopupOpen}
          onRequestClose={() => setPopupOpen(false)}
        >
          <Pressable style={styles.overlay} onPress={() => setPopupOpen(false)}>
            <Pressable
              style={[styles.popup, getPopupPositionStyle()]}
              onPress={(e) => e.stopPropagation()}
            >
              {options.map((option, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.popupOption,
                    index !== 0 && styles.popupOptionBorder
                  ]}
                  onPress={() => {
                    setPopupOpen(false);
                    option.action();
                  }}
                >
                  <Text>{option.text}</Text>
                </Pressable>
              ))}
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default PopupMenu;

const styling = (theme: Theme) => StyleSheet.create({
  wrapper: {
    position: "relative",
    overflow: "visible"
  },
  trigger: {
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  triggerPressed: {
    backgroundColor: theme.primaryAlt,
  },
  triggerWithText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  triggerWithIcon: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  triggerText: {
    color: "#FFF",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    position: "absolute",
    backgroundColor: theme.background,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 100,
  },
  popupOption: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  popupOptionBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
});

import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  name: keyof typeof Ionicons["glyphMap"];
  color: string;
}

const TabIcon: FC<Props> = ({ name, color }) => (
  <Ionicons
    size={28}
    name={name}
    color={color}
    style={{ marginBottom: -6 }}
  />
);

export default TabIcon;

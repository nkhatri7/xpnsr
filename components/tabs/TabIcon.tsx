import { ComponentProps, FC } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  name: ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}

const TabIcon: FC<Props> = ({ name, color }) => (
  <MaterialCommunityIcons
    size={28}
    name={name}
    color={color}
    style={{ marginBottom: -6 }}
  />
);

export default TabIcon;

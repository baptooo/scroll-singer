import { Text, theme } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const Logo: React.FC<Props> = (props) => {
  return (
    <Text
      fontSize="4xl"
      fontWeight="bold"
      textShadow={`0 2px 0 ${theme.colors.green[900]}`}
      color="green.300"
    >
      Scroll Singer 👆
    </Text>
  );
};

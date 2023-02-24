import { VStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export const Main: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <VStack padding="4">
      <Logo />
      {props.children}
    </VStack>
  );
};

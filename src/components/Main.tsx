import { VStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export const Main: React.FC<PropsWithChildren<any>> = (props) => {
  return (
    <VStack padding="4" maxHeight="100vh" overflow="hidden">
      <Logo />

      {props.children}
    </VStack>
  );
};

import { Button, ListItem, OrderedList, Text, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useClipboard, useGrantAccess } from "../hooks/use-clipboard";

export const Home: React.FC = (props) => {
  const clip = useClipboard();
  const grantAccess = useGrantAccess();

  return (
    <VStack padding="8" spacing="8" alignItems="flex-start">
      <Text fontSize="xl">How it works ?</Text>

      <OrderedList textAlign="left" spacing="8">
        <ListItem>
          Go to your favorite lyrics website and copy one song to your clipboard
          then open this app 💾
        </ListItem>
        <ListItem>
          You'll be prompted to share your clipboard permission 🙏
          {clip.isError ? (
            <VStack alignItems="flex-start">
              <Text marginTop="2" fontSize="xs" color="red.300">
                It looks you refused to share clipboard access, please edit your
                settings to allow sharing in order to get things working 🙂
              </Text>
              <Button onClick={() => clip.refetch()} colorScheme="green">
                Retry
              </Button>
            </VStack>
          ) : (
            <VStack alignItems="flex-start">
              <Text marginTop="2" fontSize="xs">
                We need this permission in order to be able to get what was in
                your clipboard, if you dont't consent it's OK you'll be able to
                paste yourself inside of the box
              </Text>
              <Button onClick={() => grantAccess()} colorScheme="green">
                Grant access
              </Button>
            </VStack>
          )}
        </ListItem>
        <ListItem>
          Start singing, adjust speed or start again if necessary 🎤
        </ListItem>
      </OrderedList>
    </VStack>
  );
};

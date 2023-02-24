import { ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  ListItem,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSearchLyrics } from "../queries/lyrics.queries";

interface Props {}

export const LyricsForm: React.FC<PropsWithChildren<Props>> = (props) => {
  const [term, setTerm] = useState("");
  const search = useSearchLyrics(term);

  useEffect(() => {
    if (term === "" || term == null) {
      return;
    }
    const timeout = setTimeout(() => {
      search.refetch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <Box width="100%">
      <VStack alignItems="flex-end">
        <FormControl>
          <InputGroup>
            <Input
              focusBorderColor="green.300"
              type="text"
              placeholder="Type a song name..."
              defaultValue={term}
              onInput={(evt) => {
                setTerm((evt.target as HTMLInputElement).value);
              }}
            />
            {search.isLoading && search.data == null ? (
              <InputRightAddon background="green.300">
                <Spinner color="white" alignSelf="center" />
              </InputRightAddon>
            ) : null}
          </InputGroup>
        </FormControl>
      </VStack>
      <Skeleton isLoaded={search.isFetched && search.data != null}>
        <List spacing="8" marginTop="8">
          {search.data?.map((track) => (
            <ListItem key={track.id}>
              <HStack as={RouterLink} to={`/song${track.path}`}>
                <Avatar src={track.thumb} />
                <Text flex={1}>{track.title}</Text>
                <ChevronRightIcon />
              </HStack>
            </ListItem>
          ))}
        </List>
      </Skeleton>
    </Box>
  );
};

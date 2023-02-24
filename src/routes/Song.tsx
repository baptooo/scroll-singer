import {
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRepeat, BsFillPlayFill } from "react-icons/bs";
import { useParams } from "react-router";
import { useScrapLyrics } from "../queries/lyrics.queries";

const MIN_SPEED = 1;
const MAX_SPEED = 10;

export const Song: React.FC<PropsWithChildren<any>> = (props) => {
  const params = useParams();
  const lyrics = useScrapLyrics(params.path);
  const [speed, setSpeed] = useState(5);
  const { isOpen: playing, onToggle: playPause } = useDisclosure();
  const [animationStyle, setAnimationStyle] = useState("");
  const scrollSpeed = useMemo(() => {
    if (lyrics.data != null) {
      return (lyrics.data.length / 100) * (MAX_SPEED + 1 - speed);
    }
  }, [speed, lyrics.data]);

  const setTextRef = useCallback(
    (ref: HTMLParagraphElement & HTMLPreElement) => {
      requestAnimationFrame(() => {
        if (ref == null || ref.parentElement == null) {
          return;
        }

        const scrollAmount =
          ref.scrollHeight - ref.parentElement.offsetHeight + 100;
        setAnimationStyle(`
        @keyframes scroll-singer {
          from {
            transform: none;
          }
        
          to {
            transform: translate3d(0, -${scrollAmount}px, 0);
          }
        }      
        `);
      });
    },
    []
  );

  if (lyrics.isLoading && !lyrics.data) {
    return <Spinner />;
  }

  return (
    <VStack width="100%" maxHeight="calc(100vh - 100px)" overflow="hidden">
      <Text
        ref={setTextRef}
        as="pre"
        fontSize="sm"
        whiteSpace="break-spaces"
        marginTop="4"
        colorScheme="black"
        textAlign="left"
        paddingY="16"
        animation={
          playing ? `scroll-singer forwards linear ${scrollSpeed}s` : undefined
        }
      >
        {lyrics.data}
      </Text>
      <HStack
        paddingY="4"
        paddingX="2"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        background="white"
        borderRadius="0.5rem 0.5rem 0 0"
        boxShadow="0 0 4rem #ccc"
        justifyContent="space-between"
        zIndex={1}
        userSelect="none"
      >
        <IconButton
          colorScheme="green"
          onClick={playPause}
          aria-label="play-payse"
          icon={<Icon as={playing ? BsArrowRepeat : BsFillPlayFill} />}
        />
        <IconButton
          colorScheme="green"
          onClick={() => setSpeed(Math.max(MIN_SPEED, speed - 1))}
          aria-label="play-payse"
          icon={<Icon as={AiOutlineMinus} />}
        />
        <VStack spacing="0">
          <Text>{speed}</Text>
          <Text fontSize="xs">Speed</Text>
        </VStack>
        <IconButton
          colorScheme="green"
          onClick={() => setSpeed(Math.min(MAX_SPEED, speed + 1))}
          aria-label="play-payse"
          icon={<Icon as={AiOutlinePlus} />}
        />
      </HStack>
      <style type="text/css">{animationStyle}</style>
    </VStack>
  );
};

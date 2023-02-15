import {
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { PropsWithChildren, useCallback, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRepeat, BsFillPlayFill } from "react-icons/bs";
import { useClipboard } from "../hooks/use-clipboard";

export const Song: React.FC<PropsWithChildren<any>> = (props) => {
  const clip = useClipboard();
  const [speed, setSpeed] = useState(90);
  const { isOpen: playing, onToggle: playPause } = useDisclosure();
  const [animationStyle, setAnimationStyle] = useState("");

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

  return (
    <VStack width="100%" overflow="hidden">
      <Text
        ref={setTextRef}
        as="pre"
        fontSize="sm"
        whiteSpace="break-spaces"
        marginTop="4"
        colorScheme="black"
        textAlign="left"
        paddingY="16"
        paddingBottom="-100vh"
        animation={
          playing ? `scroll-singer forwards linear ${speed}s` : undefined
        }
      >
        {clip.data}
      </Text>
      <HStack
        paddingY="4"
        paddingX="2"
        position="fixed"
        bottom="0"
        left="2"
        right="2"
        background="white"
        borderRadius="md"
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
          onClick={() => setSpeed(Math.max(20, speed - 10))}
          aria-label="play-payse"
          icon={<Icon as={AiOutlineMinus} />}
        />
        <VStack>
          <Text>{speed}</Text>
          <Text fontSize="xs">Speed (in seconds)</Text>
        </VStack>
        <IconButton
          colorScheme="green"
          onClick={() => setSpeed(Math.min(240, speed + 10))}
          aria-label="play-payse"
          icon={<Icon as={AiOutlinePlus} />}
        />
      </HStack>
      <style type="text/css">{animationStyle}</style>
    </VStack>
  );
};

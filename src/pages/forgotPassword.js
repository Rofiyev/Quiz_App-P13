import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Flex,
  Text,
  FormControl,
  Heading,
  Input,
  Stack,
  Image,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  HStack,
  PinInput,
  PinInputField,
  Center,
} from "@chakra-ui/react";
import forgot from "@/assets/forgot.png";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Forgat Password</title>
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Forgot your password?
            </Heading>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              You&apos;ll get an email with a reset link
            </Text>
            <FormControl id="email">
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onOpen}
              >
                Request Reset
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} align={"center"}>
          <Image
            h="600px"
            alt={"Login Image"}
            objectFit={"cover"}
            src={forgot.src}
          />
        </Flex>
      </Stack>

      {/* Modal ?*/}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Stack
            spacing={4}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            p={6}
          >
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Verify your Email
              </Heading>
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              We have sent code to your email
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.400")}
            >
              username@mail.com
            </Center>
            <FormControl>
              <Center>
                <HStack>
                  <PinInput>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </Center>
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Verify
              </Button>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
      {/* Modal ?*/}
    </>
  );
}

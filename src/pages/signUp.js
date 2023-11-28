import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  InputRightElement,
  Container,
  FormErrorMessage,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  useColorModeValue,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import registerImage from "@/assets/register.png";
import { Formik, Field } from "formik";
import DataFetching from "@/api";
import { useRouter } from "next/router";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [value, setValue] = useState("");
  const [canMoveNext, setCanMoveNext] = useState(true);
  const [userData, setUserData] = useState("");

  const handleChange = (e) => {
    if (e) setCanMoveNext(false);

    setCanMoveNext(true);
    setValue(e);
  };

  async function handleActiveCode() {
    setIsLoadingButton(false);
    const { success, msg } = await DataFetching.verifyCode({
      email: userData.email,
      activate_code: +value,
    });
    console.log(msg, success);

    toast({
      title: msg,
      status: success ? "success" : "error",
      variant: "left-accent",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    success && push("/signIn");
  }

  async function handleFormSubmit(values, resetForm) {
    setIsLoadingButton(true);
    const { success, msg, data } = await DataFetching.postRegister(values);
    setIsLoadingButton(false);
    toast({
      title: msg,
      status: success ? "success" : "error",
      variant: "left-accent",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    if (success) {
      resetForm();
      onOpen();
      setUserData(data);
    }
  }
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Container maxW={"7xl"}>
        <Stack minH={"100vh"} direction={{ base: "column", md: "row-reverse" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading fontSize={"2xl"} fontFamily={"inherit"}>
                Sign Up to your account
              </Heading>
              <Box p={2}>
                <Formik
                  initialValues={{
                    full_name: "",
                    username: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values, { resetForm }) =>
                    handleFormSubmit(values, resetForm)
                  }
                >
                  {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4}>
                        <Box>
                          <FormControl
                            isInvalid={!!errors.full_name && touched.full_name}
                            isRequired
                          >
                            <FormLabel>Full Name</FormLabel>
                            <Field
                              as={Input}
                              name="full_name"
                              type="text"
                              validate={(value) => {
                                let error;
                                if (value.length < 2)
                                  error =
                                    "There may be an error in the full name";

                                return error;
                              }}
                            />
                            <FormErrorMessage fontSize={"0.7rem"}>
                              {errors.full_name}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl
                            isInvalid={!!errors.username && touched.username}
                            isRequired
                          >
                            <FormLabel>Username</FormLabel>
                            <Field
                              as={Input}
                              name="username"
                              type="text"
                              validate={(value) => {
                                let error;
                                if (value.length < 2)
                                  error =
                                    "There may be an error in the username";

                                return error;
                              }}
                            />
                            <FormErrorMessage fontSize={"0.7rem"}>
                              {errors.username}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl
                            isInvalid={!!errors.email && touched.email}
                            isRequired
                          >
                            <FormLabel>Email</FormLabel>
                            <Field
                              as={Input}
                              name="email"
                              type="email"
                              validate={(value) => {
                                let error;
                                if (value.length < 2)
                                  error = "There may be an error in the email";

                                return error;
                              }}
                            />
                            <FormErrorMessage fontSize={"0.7rem"}>
                              {errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                        <FormControl
                          isInvalid={!!errors.password && touched.password}
                          isRequired
                        >
                          <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Field
                              as={Input}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              validate={(value) => {
                                let error;
                                if (value.length < 8)
                                  error =
                                    "There may be an error in the password";

                                return error;
                              }}
                            />
                            <InputRightElement h={"full"}>
                              <Button
                                variant={"ghost"}
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage fontSize={"0.7rem"}>
                            {errors.password}
                          </FormErrorMessage>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                          <Button
                            loadingText="Submitting"
                            isLoading={isLoadingButton}
                            size="lg"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                              bg: "blue.500",
                            }}
                            type="submit"
                          >
                            Sign up
                          </Button>
                        </Stack>
                        <Stack pt={6}>
                          <Text align={"center"}>
                            Already a user?{" "}
                            <Link style={{ color: "#3182ce" }} href="/signIn">
                              Login
                            </Link>
                          </Text>
                        </Stack>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </Box>
            </Stack>
          </Flex>
          <Flex flex={1} align={"center"}>
            <Image
              h="600px"
              alt={"Login Image"}
              objectFit={"cover"}
              src={registerImage.src}
            />
          </Flex>
        </Stack>
      </Container>

      {/* Modal */}
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bg={useColorModeValue("white", "gray.700")}
              rounded={"xl"}
              p={6}
              my={12}
            >
              <Heading
                textAlign={"center"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", md: "3xl" }}
                fontFamily={"inherit"}
              >
                Confirm Password?
              </Heading>
              <FormControl>
                <Center>
                  <HStack>
                    <PinInput
                      type="number"
                      manageFocus={canMoveNext}
                      value={value}
                      onChange={handleChange}
                    >
                      <PinInputField />
                      <PinInputField />
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
                  onClick={handleActiveCode}
                >
                  Send Code
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal */}
    </>
  );
}

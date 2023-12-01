import Head from "next/head";
import Link from "next/link";
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
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import loginImage from "@/assets/login.png";
import { Formik, Field } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DataFetching from "@/api";
import { useRouter } from "next/router";
import { setToken, clearToken } from "@/utils";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();
  const { push } = useRouter();

  async function handleFormSubmit(values) {
    setIsLoadingButton(true);
    const { success, msg, data } = await DataFetching.loginUser(values);
    success
      ? setIsLoadingButton(false)
      : toast({
          title: msg,
          status: success ? "success" : "error",
          variant: "left-accent",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });

    if (success) {
      push("/");
      setIsLoadingButton(false);
      clearToken();
      setToken(data);
    } else setIsLoadingButton(false);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"} fontFamily={"inherit"}>
              Sign in to your account
            </Heading>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values, { resetForm }) =>
                handleFormSubmit(values, resetForm)
              }
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
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
                            error = "There may be an error in the username";

                          return error;
                        }}
                      />
                      <FormErrorMessage fontSize={"0.7rem"}>
                        {errors.username}
                      </FormErrorMessage>
                    </FormControl>
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
                              error = "There may be an error in the password";

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
                    <Stack spacing={6}>
                      {/* <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Text></Text>
                        <Text color={"blue.500"}>
                          <Link href="/confrimPassword">Forgot password?</Link>
                        </Text>
                      </Stack> */}
                      <Button
                        loading={isLoadingButton}
                        loadingText="Submitting"
                        type="submit"
                        colorScheme={"blue"}
                        variant={"solid"}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Flex>
        <Flex flex={1} align={"center"}>
          <Image
            h="600px"
            alt={"Login Image"}
            objectFit={"cover"}
            src={loginImage.src}
          />
        </Flex>
      </Stack>
    </>
  );
}

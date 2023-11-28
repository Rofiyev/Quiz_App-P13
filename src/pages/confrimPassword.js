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
import confirm_fon from "@/assets/confrimPassword.png";
import { Formik, Field } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import DataFetching from "@/api";
import { useRouter } from "next/router";
import { getToken } from "@/utils";
import { useStateContext } from "@/context";

export default function Home() {
  const { auth } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword_2, setShowPassword_2] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const toast = useToast();
  const { push } = useRouter();

  useEffect(() => {
    !auth && push("/");
  }, []);

  async function handleFormSubmit(values) {
    setIsLoadingButton(true);
    const token = getToken();
    const { success, msg } = await DataFetching.confirmPassword(values, token);

    toast({
      title: msg,
      status: success ? "success" : "error",
      variant: "left-accent",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    success && push("/");
  }

  return (
    <>
      <Head>
        <title>Confirm Password</title>
      </Head>
      {auth && (
        <Stack minH={"100vh"} direction={{ base: "column", md: "row-reverse" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading fontSize={"2xl"} align="center" fontFamily={"inherit"}>
                Confirm New Password
              </Heading>
              <Formik
                initialValues={{
                  email: auth ? auth.email : "",
                  activation_code: "",
                  new_password: "",
                  confirm_password: "",
                }}
                onSubmit={(values, { resetForm }) =>
                  handleFormSubmit(values, resetForm)
                }
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                      <FormControl
                        isInvalid={!!errors.email && touched.email}
                        isRequired
                      >
                        <FormLabel>Email</FormLabel>
                        <Field
                          as={Input}
                          name="email"
                          type="email"
                          disabled
                          validate={(value) => {
                            let error;
                            if (value.length < 2)
                              error = "There may be an error in the Email";

                            return error;
                          }}
                        />
                        <FormErrorMessage fontSize={"0.7rem"}>
                          {errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={
                          !!errors.activation_code && touched.activation_code
                        }
                      >
                        <FormLabel>Activate Code</FormLabel>
                        <Field
                          as={Input}
                          name="activation_code"
                          type="number"
                          validate={(value) => {
                            let error;
                            if (value.length < 2)
                              error =
                                "There may be an error in the Activate Code";

                            return error;
                          }}
                        />
                        <FormErrorMessage fontSize={"0.7rem"}>
                          {errors.activation_code}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          !!errors.new_password && touched.new_password
                        }
                        isRequired
                      >
                        <FormLabel>New Password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            name="new_password"
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
                          {errors.new_password}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          !!errors.confirm_password && touched.confirm_password
                        }
                        isRequired
                      >
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                          <Field
                            as={Input}
                            name="confirm_password"
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
                              onClick={() => setShowPassword_2((prev) => !prev)}
                            >
                              {showPassword_2 ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage fontSize={"0.7rem"}>
                          {errors.confirm_password}
                        </FormErrorMessage>
                      </FormControl>

                      <Stack spacing={6}>
                        <Button
                          loading={isLoadingButton}
                          loadingText="Submitting"
                          type="submit"
                          colorScheme={"blue"}
                          variant={"solid"}
                        >
                          Submit
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
              src={confirm_fon.src}
            />
          </Flex>
        </Stack>
      )}
    </>
  );
}

import Link from "next/link";
import Layout from "@/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Flex,
  FormErrorMessage,
  Image,
  useToast,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useLayoutEffect } from "react";
import confrimPassword from "@/assets/confrimPassword.png";
import { Field, Formik } from "formik";
import { useStateContext } from "@/context";
import { useRouter } from "next/router";
import DataFetching from "@/api";
import { useState } from "react";
import { getToken } from "@/utils";

export default function Profile() {
  const { auth, setAuth } = useStateContext();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useLayoutEffect(() => {
    if (!auth) push("/");
  }, [auth]);

  async function handleFormSubmit(values) {
    setIsLoading(true);
    const token = getToken();
    const { success, data, msg } = await DataFetching.changeProfile(
      values,
      token
    );

    toast({
      title: msg,
      status: success ? "success" : "error",
      variant: "left-accent",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    if (success) {
      setIsLoading(false);
      setAuth(data);
    }
  }

  async function handleResetPassword() {
    const token = getToken();
    const { success, msg } = await DataFetching.resetPassword(
      { email: auth.email },
      token
    );
    toast({
      title: msg,
      status: success ? "success" : "error",
      variant: "left-accent",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });

    if (success) push("/confrimPassword");
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {auth && (
        <Layout>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Heading fontSize={"2xl"} fontFamily={"inherit"} align="center">
                  Change Profile
                </Heading>
                <Formik
                  initialValues={{
                    username: (auth && auth.username) || "",
                    full_name: (auth && auth.full_name) || "",
                    email: (auth && auth.email) || "",
                  }}
                  onSubmit={(values) => handleFormSubmit(values)}
                >
                  {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4}>
                        <FormControl
                          isInvalid={!!errors.username && touched.username}
                        >
                          <FormLabel>Username</FormLabel>
                          <Field
                            as={Input}
                            name="username"
                            type="text"
                            validate={(value) => {
                              let error;
                              if (value.length < 2)
                                error = "There may be an error in the Username";

                              return error;
                            }}
                          />
                          <FormErrorMessage fontSize={"0.7rem"}>
                            {errors.username}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={!!errors.full_name && touched.full_name}
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
                                  "There may be an error in the Full Name";

                              return error;
                            }}
                          />
                          <FormErrorMessage fontSize={"0.7rem"}>
                            {errors.full_name}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={!!errors.email && touched.email}
                        >
                          <FormLabel>Email</FormLabel>
                          <Field
                            as={Input}
                            name="email"
                            type="email"
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
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          align={"start"}
                          justify={"space-between"}
                        >
                          <Text></Text>
                          <Text
                            color={"blue.500"}
                            onClick={handleResetPassword}
                            style={{ cursor: "pointer" }}
                          >
                            Reset password
                          </Text>
                        </Stack>
                        <Stack spacing={6}>
                          <Button
                            isLoading={isLoading}
                            loadingText="Submitting"
                            type="submit"
                            colorScheme={"blue"}
                            variant={"solid"}
                          >
                            Save
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
                src={confrimPassword.src}
              />
            </Flex>
          </Stack>
        </Layout>
      )}
    </>
  );
}

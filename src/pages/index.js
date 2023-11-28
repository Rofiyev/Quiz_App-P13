import Head from "next/head";
import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  useBreakpointValue,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import fon from "@/assets/home.png";
import Layout from "@/layout";
import { Testimonials, Features } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quiz App</title>
      </Head>
      <Layout>
        <Container as={"section"} maxW={"7xl"}>
          <Stack minH={"70vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={1} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      height: useBreakpointValue({ base: "20%", md: "30%" }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "blue.400",
                      zIndex: -1,
                    }}
                  >
                    Quzi App
                  </Text>
                  <br />{" "}
                  <Text color={"blue.400"} as={"span"}>
                    Test your programming knowledge
                  </Text>{" "}
                </Heading>
                <Text fontSize={{ base: "sm", lg: "md" }} color={"gray.500"}>
                  The project board is an exclusive resource for contract work.
                  It&apos;s perfect for freelancers, agencies, and moonlighters.
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <Button
                    rounded={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    <Link href="/category">Quick start</Link>
                  </Button>
                  <Button rounded={"full"}>
                    <Link href="/about">Read More</Link>
                  </Button>
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1} align={"center"}>
              <Image
                h="600px"
                alt={"Login Image"}
                objectFit={"cover"}
                src={fon.src}
              />
            </Flex>
          </Stack>
        </Container>
        <Box bg={useColorModeValue("gray.100", "gray.700")}>
          <Container as={"section"} maxW={"7xl"}>
            <Features />
            <Stack minH={"70vh"} direction={{ base: "column", md: "row" }}>
              <Testimonials />
            </Stack>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

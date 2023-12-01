import {
  Box,
  chakra,
  Container,
  Flex,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import Layout from "@/layout";
import { BASE_API_URL } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { useStateContext } from "@/context";

export default function Category({ data }) {
  const { auth } = useStateContext();

  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <Layout>
        <Flex
          bg="#edf3f8"
          p={50}
          w="full"
          alignItems="center"
          justifyContent="flex-star"
          wrap="wrap"
          gap={6}
        >
          <Container maxW={"7xl"}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
              {data.map((item) => (
                <Box
                  key={item.id}
                  mx="auto"
                  bg="white"
                  _dark={{
                    bg: "gray.800",
                  }}
                  shadow="lg"
                  rounded="lg"
                >
                  <Box w={"100%"} px={4} py={2}>
                    <chakra.h1
                      color="gray.800"
                      fontWeight="bold"
                      fontSize="3xl"
                      textTransform="uppercase"
                    >
                      {item.title}
                    </chakra.h1>
                    <chakra.p
                      mt={1}
                      fontSize="sm"
                      color="gray.600"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 5,
                      }}
                    >
                      {item.description}
                    </chakra.p>
                  </Box>
                  <Image
                    h={48}
                    w="full"
                    fit="cover"
                    mt={2}
                    src={item.image}
                    alt="Programming language"
                  />
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    bg="gray.900"
                    roundedBottom="lg"
                  >
                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                      Test: {item.questions_count}
                    </chakra.h1>
                    <chakra.button
                      px={2}
                      py={1}
                      bg="white"
                      fontSize="xs"
                      color="gray.900"
                      fontWeight="bold"
                      rounded="lg"
                      textTransform="uppercase"
                      _hover={{
                        bg: "gray.200",
                      }}
                      _focus={{
                        bg: "gray.400",
                      }}
                    >
                      <Link href={auth ? `category/${item.id}` : "/signIn"}>
                        Start
                      </Link>
                    </chakra.button>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Flex>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`${BASE_API_URL}/quizes/category`);
  return { props: { data } };
}

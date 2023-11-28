import { useRouter } from "next/router";
import Head from "next/head";
import { Flex, Text, Stack, Image } from "@chakra-ui/react";
import answer_fon from "@/assets/answer.png";
import { useEffect } from "react";
import DataFetching from "@/api";
import { getToken } from "@/utils";

export default function CategoryDetail() {
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (id) {
      const token = getToken();
      (async () => {
        const { data, success } = await DataFetching.getCategoryIDQuations(
          id,
          token
        );
        success && console.log(data);
      })();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Python Test</title>
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row-reverse" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Text>Test: {id}</Text>
        </Flex>
        <Flex flex={1} align={"center"}>
          <Image
            h="600px"
            alt={"Login Image"}
            objectFit={"cover"}
            src={answer_fon.src}
          />
        </Flex>
      </Stack>
    </>
  );
}

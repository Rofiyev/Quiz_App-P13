import {
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Stack,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import notFoundImage from "@/assets/not-found.png";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="3xl"
              bgGradient="linear(to-r, teal.400, teal.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="4xl" fontWeight={"600"} mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"gray.500"} mb={6}>
              The page you&apos;re looking for does not seem to exist
            </Text>

            <Button
              colorScheme="teal"
              bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
              color="white"
              variant="solid"
            >
              <Link href="/">Go to Home</Link>
            </Button>
          </Box>
        </Flex>
        <Flex flex={1} align={"center"}>
          <Image
            h="600px"
            alt={"Login Image"}
            objectFit={"cover"}
            src={notFoundImage.src}
          />
        </Flex>
      </Stack>
    </>
  );
}

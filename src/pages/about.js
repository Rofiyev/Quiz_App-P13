import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import Layout from "@/layout";
import Head from "next/head";
import { aboutData } from "@/data";
import { FaStar } from "react-icons/fa";

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout>
        <Container maxW={"7xl"} p="12">
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
              >
                <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    borderRadius="lg"
                    src={
                      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJvbnQlMjBlbmQlMjBkZXZlbG9wZXJ8ZW58MHx8MHx8fDA%3D"
                    }
                    alt="some good alt text"
                    objectFit="contain"
                  />
                </Box>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={useColorModeValue(
                    "radial(orange.600 1px, transparent 1px)",
                    "radial(orange.300 1px, transparent 1px)"
                  )}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Heading marginTop="1">
                <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                  What is programming?
                </Text>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="lg"
              >
                Programming is, quite literally, all around us. From the
                take-out we order, to the movies we stream, code enables
                everyday actions in our lives. Tech companies are no longer
                recognizable as just software companies — instead, they bring
                food to our door, help us get a taxi, influence outcomes in
                presidential elections, or act as a personal trainer. When
                you`re walking down the street, where can you find technology in
                your environment? Click on the white circles.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date("2021-04-06T19:01:27Z")}
              />
            </Box>
          </Box>
          <Heading as="h2" marginTop="5">
            About programming languages
          </Heading>
          <Divider marginTop="5" />
          <Wrap spacing="30px" marginTop="5">
            {aboutData.map((item, i) => (
              <WrapItem
                key={i}
                width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
              >
                <Box w="100%">
                  <Box borderRadius="lg" overflow="hidden">
                    <Box
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      <Image
                        transform="scale(1.0)"
                        src={item.image}
                        alt="some text"
                        objectFit="cover"
                        width="100%"
                        height={"200px"}
                        transition="0.3s ease-in-out"
                        _hover={{
                          transform: "scale(1.05)",
                        }}
                      />
                    </Box>
                  </Box>
                  <HStack spacing={2} marginTop={2}>
                    <Tag size={"md"} variant="solid" colorScheme="blue">
                      {item.badge}
                    </Tag>
                    <Tag
                      size={"md"}
                      variant="solid"
                      colorScheme="blue"
                      display="flex"
                      alignItems="center"
                      gap="1"
                    >
                      <FaStar style={{ color: "orange.400" }} /> {item.stars}
                    </Tag>
                  </HStack>
                  <Heading fontSize="xl" marginTop="2">
                    <Text
                      textDecoration="none"
                      _hover={{ textDecoration: "none" }}
                    >
                      {item.title}
                    </Text>
                  </Heading>
                  <Text as="p" fontSize="md" marginTop="2">
                    {item.desc}
                  </Text>
                  <BlogAuthor
                    name="Alisa"
                    date={new Date("2021-04-06T19:01:27Z")}
                  />
                </Box>
              </WrapItem>
            ))}
          </Wrap>
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <Heading as="h2">Programming languages</Heading>
            <Text as="p" fontSize="lg">
              A programming language is a type of written language that tells
              computers what to do. Examples are: Python, Ruby, Java,
              JavaScript, C, C++, and C#. Programming languages are used to
              write computer programs and computer software. A programming
              language is like a set of commands that tell the computer how to
              do things. Usually, the programming language uses real words for
              some of the commands (e.g. if... then... else..., and, or),
              so that the language is easier for a human to understand. Like any
              normal language, many programming languages use punctuation. To
              make a program, a programmer writes commands in their chosen
              programming language and saves the commands to a text file. This
              text file is called source code. Some programming languages, such
              as Python and JavaScript, can be read by the computer right away.
              If not, the source code has to be compiled, which means that the
              computer translates the source code into another language (such as
              assembly language or machine language) that a computer can read,
              but which is much harder for a person to read. Computer programs
              must be written very carefully. If a programmer makes mistakes,
              then the program might then stop working, which is called
              crashing. When a program has a problem because of how the code
              was written, this is called a bug. A very small mistake can
              cause very serious bugs.
            </Text>
          </VStack>
        </Container>
      </Layout>
    </>
  );
};

export default ArticleList;

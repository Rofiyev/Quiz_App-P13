import { useRouter } from "next/router";
import Head from "next/head";
import {
  Flex,
  Text,
  Stack,
  Image,
  Card,
  CardHeader,
  CardBody,
  Box,
  Heading,
  CardFooter,
  Button,
  Spinner,
  useDisclosure,
  ModalBody,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import answer_fon from "@/assets/answer.png";
import { useEffect } from "react";
import DataFetching from "@/api";
import { getToken } from "@/utils";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Link from "next/link";

export default function CategoryDetail() {
  const {
    query: { id },
  } = useRouter();
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [fullData, setFullData] = useState({
    category: null,
    answers: [],
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result, setResult] = useState("");

  useEffect(() => {
    if (id) {
      const token = getToken();
      (async () => {
        const { data, success } = await DataFetching.getCategoryIDQuations(
          id,
          token
        );
        success && setQuestions(data.questions);
      })();
    }
  }, [id]);

  const handleAnswer = (answerId) => {
    setFullData({
      category: +id,
      answers: [
        ...fullData.answers,
        { question_id: questions[count].id, answer_id: answerId },
      ],
    });
    if (count < questions.length - 1) setCount((count) => (count += 1));
    else {
      setCount(questions.length - 1);
      setIsDisabled(true);
    }
  };

  async function getResultsData() {
    const token = getToken();
    const { data, success } = await DataFetching.getResults(fullData, token);
    if (success) {
      onOpen();
      setResult(data);
    }
  }

  return (
    <>
      <Head>
        <title>Python Test</title>
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row-reverse" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          {!questions.length ? (
            <Spinner />
          ) : (
            <Card w={"full"}>
              <CardHeader>
                <Heading as="h3" size={"lg"}>
                  {questions[count]?.question}
                </Heading>
              </CardHeader>
              <CardBody
                display="flex"
                flexDirection="column"
                gap="10px"
                px={0}
                py={3}
                style={{
                  cursor: isDisabled && "not-allowed",
                  opacity: isDisabled && "0.50",
                }}
              >
                {questions[count]?.answer.map((item, i) => (
                  <Box
                    key={item.id}
                    _hover={{ background: !isDisabled && "#d8d8d8" }}
                    _active={{ background: !isDisabled && "#08f26e" }}
                    style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                    w={"full"}
                    p={3}
                    onClick={() => handleAnswer(item.id)}
                  >
                    <Text as="p">
                      {i + 1}. {item.answer}
                    </Text>
                  </Box>
                ))}
              </CardBody>
              <CardFooter justify={"space-between"}>
                <Button colorScheme="red" onClick={getResultsData}>
                  Stop
                </Button>
                <Button
                  colorScheme="whatsapp"
                  isDisabled={!isDisabled}
                  onClick={getResultsData}
                >
                  Finish
                </Button>
              </CardFooter>
            </Card>
          )}
          {/* Modal */}
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ConfettiExplosion
                id="confetti"
                duration={5000}
                particleCount={350}
                force={0.8}
                width={1700}
                height={1700}
              />
              <ModalHeader align="center">Check your result</ModalHeader>
              <ModalBody
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex flexDirection={"column"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"4xl"}>
                    {result && result?.count}
                  </Text>
                  <Text>Number of questions</Text>
                </Flex>
                <Flex>
                  <Text fontSize={"2xl"}>:</Text>
                </Flex>
                <Flex flexDirection={"column"} align={"center"}>
                  <Text fontWeight={"bold"} fontSize={"4xl"}>
                    {result && result?.is_correct}
                  </Text>
                  <Text>Number of responses</Text>
                </Flex>
              </ModalBody>
              <ModalFooter display={"flex"} justifyContent={"center"} mt={2}>
                <Button size="sm" colorScheme="blue">
                  <Link href="/category">Go to Home</Link>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* Modal */}
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

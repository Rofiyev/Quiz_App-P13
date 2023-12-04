import DataFetching from "@/api";
import Layout from "@/layout";
import { getToken } from "@/utils";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Container,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = getToken();
      const { data, success } = await DataFetching.getHistory(token);
      success && setResData(data);
    })();
  }, []);

  const countStar = (result) => {
    let c = result.split("/");
    return Math.round((c[0] / c[1]) * 5);
  };

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Layout>
        <Container maxW="7xl" py={5} minH={"60vh"}>
          <Heading size="xl" align={"center"} fontFamily={"inherit"} mb={4}>
            Table of solutions
          </Heading>
          {resData.length && (
            <TableContainer w="full">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontFamily={"inherit"}>Number</Th>
                    <Th fontFamily={"inherit"}>Category</Th>
                    <Th fontFamily={"inherit"}>Result</Th>
                    <Th fontFamily={"inherit"}>Date</Th>
                    <Th fontFamily={"inherit"}>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {resData?.map((item, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.correct}</Td>
                      <Td>{item.time}</Td>
                      <Td display={"flex"} gap={"2px"}>
                        {[...Array(countStar(item.correct))].map((_, i) => (
                          <FaStar key={i} style={{ color: "orange" }} />
                        ))}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Layout>
    </>
  );
}

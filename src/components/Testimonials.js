"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let settings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Testimonials({ feedback }) {
  return (
    <>
      {feedback.length && (
        <Box>
          <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
            <Stack spacing={0} align={"center"}>
              <Heading>Our Clients Speak</Heading>
              <Text>We have been working with clients around the world</Text>
            </Stack>

            <SimpleGrid columns={{ base: 1 }} gap={2}>
              <GridItem w="100%" h="100%">
                <Slider {...settings}>
                  {feedback.map((item, i) => (
                    <Stack key={i} px={1}>
                      <Stack
                        bg={"gray.50"}
                        boxShadow={"lg"}
                        p={8}
                        rounded={"xl"}
                        align={"center"}
                        pos={"relative"}
                        _after={{
                          content: `""`,
                          w: 0,
                          h: 0,
                          borderLeft: "solid transparent",
                          borderLeftWidth: 16,
                          borderRight: "solid transparent",
                          borderRightWidth: 16,
                          borderTop: "solid",
                          borderTopWidth: 16,
                          borderTopColor: "gray.50",
                          pos: "absolute",
                          bottom: "-16px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <Text textAlign={"center"} fontSize={"sm"}>
                          {item.description}
                        </Text>
                      </Stack>
                      <Flex align={"center"} mt={8} direction={"column"}>
                        <Avatar
                          src={
                            "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                          }
                          mb={2}
                        />
                        <Stack spacing={-1} align={"center"}>
                          <Text fontWeight={600}>{item?.name}</Text>
                          <Text fontSize={"sm"}>{item?.email}</Text>
                        </Stack>
                      </Flex>
                    </Stack>
                  ))}
                </Slider>
              </GridItem>
            </SimpleGrid>
          </Container>
        </Box>
      )}
    </>
  );
}

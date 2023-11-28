import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "@/context";
import { clearToken } from "@/utils";

const Links = [
  {
    route: "/",
    name: "Home",
  },
  {
    route: "/about",
    name: "About",
  },
  {
    route: "/feedback",
    name: "Feedback",
  },
];

const NavLink = ({ children, route }) => {
  const { push } = useRouter();
  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      onClick={() => push(route)}
      style={{ cursor: "pointer" }}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useStateContext();

  const removeUser = () => {
    setAuth(null);
    clearToken();
  };

  return (
    <Box
      as={"header"}
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container maxW={"7xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                height={60}
                width={60}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ route, name }) => (
                <NavLink key={name} route={route}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          {auth ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{auth.username}</p>
                  </Center>
                  <br />
                  <MenuItem>
                    <Link
                      style={{ display: "flex", gap: "10px" }}
                      href={"/profile"}
                    >
                      <CgProfile style={{ fontSize: "1.2rem" }} />
                      My Account
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      style={{ display: "flex", gap: "10px" }}
                      href={"/history"}
                    >
                      <FaHistory style={{ fontSize: "1.1rem" }} />
                      Test history
                    </Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    display={"flex"}
                    gap={"10px"}
                    _hover={{ background: "red.100" }}
                    color={"red.500"}
                    onClick={removeUser}
                  >
                    <CgLogOut style={{ fontSize: "1.2rem" }} />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button fontSize={"sm"} fontWeight={400}>
                <Link href={"/signIn"}>Sign In</Link>
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                _hover={{
                  bg: "blue.600",
                }}
              >
                <Link href={"/signUp"}>Sign Up</Link>
              </Button>
            </Stack>
          )}
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

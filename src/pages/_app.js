import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import NextNProgress from "nextjs-progressbar";
import "react-multi-carousel/lib/styles.css";
import { StateContext } from "@/context";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress
        color="#3182ce"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </ChakraProvider>
  );
}

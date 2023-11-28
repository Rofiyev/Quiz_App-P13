import DataFetching from "@/api";
import { Navbar, Footer } from "@/components";
import { useStateContext } from "@/context";
import { getToken } from "@/utils";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { setAuth } = useStateContext();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const { data } = await DataFetching.getUser(token);
        data && setAuth(data);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

import DataFetching from "@/api";
import { Navbar, Footer } from "@/components";
import { useStateContext } from "@/context";
import { getToken } from "@/utils";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { setAuth } = useStateContext();

  useEffect(() => {
    (async () => {
      let hours = 24;
      let now = new Date().getTime();
      let setupTime = localStorage.getItem("setupTime");
      if (setupTime == null) {
        localStorage.setItem("setupTime", now);
      } else {
        if (now - setupTime > hours * 60 * 60 * 1000) {
          localStorage.clear();
          localStorage.setItem("setupTime", now);
        }
      }
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

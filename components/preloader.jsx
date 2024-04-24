import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/contexts/global-context";
import AppLoader from "./loader";

export default function PreLoader({ children }) {
  const { loading, setLoading } = useGlobalContext();

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const startLoader = async (url, { shallow }) => {
      isMounted && setLoading((prev) => true);
      window.scroll(0, 0);
    };

    const stopLoader = (url, { shallow }) => {
      isMounted && setLoading((prev) => false);
    };

    router.events.on("routeChangeStart", startLoader);

    router.events.on("routeChangeComplete", stopLoader);

    return () => {
      isMounted = false;
      setLoading((prev) => false);
      router.events.off("routeChangeStart", startLoader);
      router.events.off("routeChangeComplete", stopLoader);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <>
      {loading && <AppLoader />}
      {children}
    </>
  );
}

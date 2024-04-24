import Footer from "@/containers/footer";
import Header from "@/containers/header";
import Head from "next/head";
import "normalize.css/normalize.css";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import PreLoader from "@/components/preloader";
import GlobalProvider from "@/contexts/global-context";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content={Component.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <>
      <ThirdwebProvider desiredChainId={ChainId.Sepolia}>
        <MantineProvider
          theme={{
            colors: {
              "ocean-blue": [
                "#7AD1DD",
                "#5FCCDB",
                "#44CADC",
                "#2AC9DE",
                "#1AC2D9",
                "#11B7CD",
                "#09ADC3",
                "#0E99AC",
                "#128797",
                "#147885",
              ],
              "bright-pink": [
                "#F0BBDD",
                "#ED9BCF",
                "#EC7CC3",
                "#ED5DB8",
                "#F13EAF",
                "#F71FA7",
                "#FF00A1",
                "#E00890",
                "#C50E82",
                "#AD1374",
              ],
              secondary: ["#3bd4e1"],
            },
          }}
        >
          <GlobalProvider>
            <PreLoader>
              <Header />

              <main className="pt-[120px] pb-[80px]">
                <Component {...pageProps} />
              </main>
              <Footer />
            </PreLoader>
          </GlobalProvider>
        </MantineProvider>
      </ThirdwebProvider>
      </>
    </>
  );
}

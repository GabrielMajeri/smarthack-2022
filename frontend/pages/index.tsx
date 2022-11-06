import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";\

import Content from "./Views/Content";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { MantineProvider } from "@mantine/core";
import { TypographyStylesProvider } from "@mantine/core";

export default function Home() {
  return (
    <MantineProvider theme={{ fontFamily: "Microsoft YaHei" }} withGlobalStyles>
      <TypographyStylesProvider>
        <Head>
          <title>AutoFlow</title>
        </Head>
        <Header />
        <Content />
        <Footer />
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

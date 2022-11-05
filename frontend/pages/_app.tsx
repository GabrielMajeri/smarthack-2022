import "../styles/globals.css";
import "../styles/SectionOne.scss";
import "../styles/About.scss";
import "../styles/Content.scss";
import "../styles/Footer.scss";
import "../styles/Header.scss";
import "../styles/SectionFive.scss";
import "../styles/SectionFour.scss";
import "../styles/SectionThree.scss";
import "../styles/SectionTwo.scss";
import "../styles/Login.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavbarComponent from "../components/Navbar/NavbarComponent";
//test comment
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavbarComponent />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

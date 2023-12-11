import { ProductsProvider } from "@/src/context/ProductsContext";
import { ImagesProvider } from "@/src/context/ImagesContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@/src/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ProductsProvider>
        <ImagesProvider>
          <Component {...pageProps} />
        </ImagesProvider>
      </ProductsProvider>
      <ToastContainer position="top-center" />
    </>
  );
}

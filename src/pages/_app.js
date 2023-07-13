import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}

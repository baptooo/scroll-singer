import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { Main } from "./components/Main";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Main>
          <App />
        </Main>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

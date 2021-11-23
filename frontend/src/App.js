import "./App.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainLayout from "./layout/MainLayout";

import MainContent from "./components/MainContent";
import ColorModeProvider from "./layout/ColorModeProvider";

function App() {
  return (
    <ChakraProvider resetCss>
      <ColorModeProvider>
        <MainLayout>
          <MainContent />
        </MainLayout>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;

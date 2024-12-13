import { Heading } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import "./App.css";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Box>
      <Heading>Book Tracker</Heading>
      <MainPage />
    </Box>
  );
}

export default App;

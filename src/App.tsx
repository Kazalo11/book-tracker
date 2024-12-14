import { Heading } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CreatePage from "./components/CreatePage";

function App() {
  return (
    <Box>
      <Heading>Book Tracker</Heading>
      <Router>
        <Routes>
          <Route path="/" element={<CreatePage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;

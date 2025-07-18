import { Box, Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"}> {/* Main container for the app */}
      <Navbar /> {/* Navbar component for navigation */}
      <Routes> {/* Define routes for the application */}
        <Route path="/" element={<HomePage />} /> {/* HomePage component to display current products */}
        <Route path="/create" element={<CreatePage />} /> {/* CreatePage component to allow users to create new products */}
      </Routes>
    </Box>
  );
}

export default App;

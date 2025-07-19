import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode> {/* Strict mode to help identify potential problems in the application */}
		<BrowserRouter> {/* BrowserRouter to enable routing in the application */}
			<ChakraProvider> {/* ChakraProvider to enable Chakra UI components */}
				<App /> {/* Main application component */}
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);

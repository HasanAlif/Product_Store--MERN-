import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => { // Navbar component
	// Using Chakra UI's useColorMode hook to manage color mode (light/dark)
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}> {/* Container to hold the Navbar content */}
			{/* Flex container for layout, responsive to screen size */}
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}} // Column on small screens, row on larger screens
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text> {/* Title of the Navbar with gradient text */}

				<HStack spacing={2} alignItems={"center"}> {/* Horizontal stack for buttons */}
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link> {/* Button to navigate to create product page */}
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button> {/* Button to toggle between light and dark mode */}
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;

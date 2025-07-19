import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/productCard";


const HomePage = () => { // HomePage component to display current products

  const { fetchProducts, products } = useProductStore(); // Accessing product store to fetch products

  useEffect(() => {
		fetchProducts();
	}, [fetchProducts]); // Fetch products when the component mounts
	console.log("products", products);

  return (
    <Container maxW="container.xl" py={12}> {/* Container to hold the HomePage content */}
      <VStack spacing={8}> {/* Vertical stack for layout */}
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        > {/* Title of the HomePage */}
          Current Products 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        > {/* Grid to display product cards */}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          > {/* Message when no products are found */}
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              > {/* Link to create a new product */}
                Create a product
              </Text>
            </Link>
          </Text>
        )} {/* Conditional rendering for no products */}
      </VStack>
    </Container>
  );
};

export default HomePage;

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => { // CreatePage component for adding new products
  // State to manage the new product data
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast(); // Toast for displaying messages

  const { createProduct } = useProductStore(); // Accessing product store for create operation

  const handleAddProduct = async () => { // Function to handle adding a new product
    const { success, message } = await createProduct(newProduct);// Call createProduct from the store with the new product data
    if (!success) { // If creation fails, show error toast
      toast({// Show error toast
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {// If creation is successful, show success toast
      toast({// Show success toast
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });// Reset the form after successful creation
  };

  return (
    <Container maxW={"container.sm"}> {/* Container to hold the CreatePage content */}
      <VStack spacing={8}> {/* Vertical stack for layout */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}> {/* Heading for the page */}
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        > {/* Box to hold the form */}
          <VStack spacing={4}> {/* Vertical stack for input fields */}
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            /> {/* Input field for product name */}
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            /> {/* Input field for product price */}
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            /> {/* Input field for product image URL */}

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button> {/* Button to submit the new product */}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

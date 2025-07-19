import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => { // ProductCard component
  // State to manage the product being updated
  const [updatedProduct, setUpdatedProduct] = useState(product);// Initialize with the current product data

  const textColor = useColorModeValue("gray.600", "gray.200");// Text color based on the current color mode
  const bg = useColorModeValue("white", "gray.800");// Background color based on the current color mode

  const { deleteProduct, updateProduct } = useProductStore();// Accessing product store for delete and update operations
  const toast = useToast();// Toast for displaying messages
  const { isOpen, onOpen, onClose } = useDisclosure();// Chakra UI hook for managing modal state

  const handleDeleteProduct = async (pid) => {// Function to handle product deletion
    const { success, message } = await deleteProduct(pid);// Call deleteProduct from the store
    if (!success) {// If deletion fails, show error toast
      toast({// Show error toast
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {// If deletion is successful, show success toast
      toast({// Show success toast
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {// Function to handle product update
    const { success, message } = await updateProduct(pid, updatedProduct);// Call updateProduct from the store with the updated product data
    onClose();
    if (!success) {// If update fails, show error toast
      toast({// Show error toast
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {// If update is successful, show success toast
      toast({// Show success toast
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    > {/* Box to hold the product card */}
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      /> {/* Image of the product */}

      <Box p={4}> {/* Box to hold product details */}
        <Heading as="h3" size="md" mb={2}> {/* Product name */}
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}> {/* Product price */}
          ${product.price}
        </Text>

        <HStack spacing={2}> {/* Horizontal stack for action buttons */}
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" /> {/* Button to open modal for updating product */}
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          /> {/* Button to delete the product */}
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}> {/* Modal for updating product */}
        <ModalOverlay /> {/* Overlay for the modal */}

        <ModalContent> {/* Content of the modal */}
          <ModalHeader>Update Product</ModalHeader> {/* Header of the modal */}
          <ModalCloseButton /> {/* Button to close the modal */}
          <ModalBody> {/* Body of the modal to hold input fields for updating product */}
            <VStack spacing={4}> {/* Vertical stack for input fields */}
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              /> {/* Input field for product name */}
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              /> {/* Input field for product price */}
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              /> {/* Input field for product image URL */}
            </VStack>
          </ModalBody>

          <ModalFooter> {/* Footer of the modal to hold action buttons */}
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            > {/* Button to update the product */}
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button> {/* Button to cancel the update */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ProductCard;

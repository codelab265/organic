import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../shared/theme/Colors";
import { useCartContext } from "../../../context/CartContext";

const CartItem = ({ item }) => {
  const {
    editProductQuantity,
    addProductQuantity,
    subtractProductQuantity,
    removeFromCart,
  } = useCartContext();

  return (
    <HStack
      borderWidth={1}
      borderColor={"gray.300"}
      w={"full"}
      rounded={"lg"}
      mb={2}
    >
      <Box w={90} h={90} bg={"amber.300"} overflow={"hidden"} roundedLeft={'lg'}>
        <Image
          source={{ uri: `${BASE_URL2}/${item.product.product_image}` }}
          w="full"
          h={"full"}
          resizeMode={"cover"}
          alt={item.product.product_name}
        />
      </Box>
      <Box
        flex={1}
        py={1}
        px={2}
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <VStack>
          <Box>
            <Text fontFamily={"Poppins_500Medium"} fontSize={"md"}>
              {item.product.product_name}
            </Text>
          </Box>
          <HStack
            alignItems={"center"}
            bg={"white"}
            rounded="full"
            mt={1}
            borderWidth={1}
            borderColor={"gray.200"}
          >
            <TouchableOpacity
              onPress={() => {
                if (item.quantity == 1) return;
                subtractProductQuantity(item.product.id);
              }}
            >
              <Box
                bg={Colors.primary}
                w={10}
                h={10}
                rounded="full"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FontAwesome name="minus" color={"white"} />
              </Box>
            </TouchableOpacity>
            <Box px={2}>
              <Text>{item.quantity.toString()}</Text>
            </Box>
            <TouchableOpacity
              onPress={() => {
                addProductQuantity(item.product.id);
              }}
            >
              <Box
                bg={Colors.primary}
                w={10}
                h={10}
                rounded="full"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FontAwesome name="plus" color={"white"} />
              </Box>
            </TouchableOpacity>
          </HStack>
        </VStack>
        <VStack>
          <Text fontFamily={"Poppins_500Medium"} fontSize={"md"}>
            ₱ {parseFloat(item.totalPrice).toFixed(2)}
          </Text>
          <Box mt={1} alignItems={"flex-end"}>
            <TouchableOpacity 
            onPress={() => removeFromCart(item.product)}
            >
              <Box
                bg={"red.400"}
                w={10}
                h={10}
                rounded="full"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FontAwesome name="times" color={"white"} />
              </Box>
            </TouchableOpacity>
          </Box>
        </VStack>
      </Box>
    </HStack>
  );
};

export default CartItem;

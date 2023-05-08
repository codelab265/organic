import { Box, Button, HStack, Image, Text, TextField } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native";
import Colors from "../../../../shared/theme/Colors";
import { useCartContext } from "../../../../context/CartContext";
import { useState } from "react";
import { Alert } from "react-native";

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  const { cart, addToCart } = useCartContext();

  const [quantity, setQuantity] = useState("0");

  const productInCart = () => cart.map((item) => item.product.id).includes(product.id);

  return (
    <Box flex={1} mb={70}>
      <Box flex={1} alignItems={"center"} justifyContent={"center"} p={4}>
        <Box w={"full"} rounded={"lg"} overflow={"hidden"}>
          <Image
            source={{ uri: `${BASE_URL2}/${product.product_image}` }}
            resizeMode={"cover"}
            w={"full"}
            height={"full"}
            alt={product.product_name}
          />
        </Box>
      </Box>
      <Box flex={2} p={4}>
        <Box flex={1} bg={"gray.200"} rounded={"lg"} p={4}>
          <HStack justifyContent={"space-between"}>
            <Text fontSize={"lg"} fontFamily={"Poppins_600SemiBold"}>
              {product.product_name}
            </Text>
            <Text
              fontSize={"lg"}
              fontFamily={"Poppins_500Medium"}
            >{`₱ ${product.price}`}</Text>
          </HStack>
          <Box pt={4}>
            <Text fontFamily={"Poppins_400Regular"}>
              {product.product_description}
            </Text>
          </Box>
          <Box flex={1} position={"relative"}>
            <HStack
              alignItems={"center"}
              position={"absolute"}
              w={"full"}
              bottom={2}
            >
              <HStack w={"1/2"}>
                <Button
                  roundedRight={"none"}
                  roundedLeft={"3xl"}
                  bg={Colors.primaryDark}
                  isDisabled={productInCart()}
                  onPress={() => {
                    if (quantity == 0) return;
                    const newQty = parseInt(quantity) - 1;
                    setQuantity(newQty.toString());
                  }}
                >
                  <FontAwesome name="minus" size={20} color={Colors.white} />
                </Button>
                <TextInput
                  value={quantity}
                  onChangeText={(e) => setQuantity(e)}
                  keyboardType={"number-pad"}
                  style={{
                    width: 60,
                    height: 40,
                    textAlign: "center",
                    backgroundColor: Colors.white,
                  }}
                />
                <Button
                  roundedRight={"3xl"}
                  roundedLeft={"none"}
                  bg={Colors.primaryDark}
                  isDisabled={productInCart()}
                  onPress={() => {
                    const newQty = parseInt(quantity) + 1;
                    setQuantity(newQty.toString());
                  }}
                >
                  <FontAwesome name="plus" size={20} color={Colors.white} />
                </Button>
              </HStack>
              <Box w={"1/2"}>
                <Button
                  rounded={"full"}
                  bg={Colors.primary}
                  isDisabled={productInCart()}
                  onPress={() => {
                    if (quantity == 0) return;

                    addToCart({
                      ...route.params,
                      quantity,
                      totalPrice: product.price * quantity,
                    });

                    setQuantity("0");
                    Alert.alert('message', 'Added successfully');
                    navigation.goBack();
                  }}
                >
                  <Text fontFamily={"Poppins_500Medium"} color={"white"}>
                    <FontAwesome name="plus-circle" size={20} /> Add to cart
                  </Text>
                </Button>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;

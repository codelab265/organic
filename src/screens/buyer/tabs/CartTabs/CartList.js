import {
  Box,
  Button,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useState } from "react";
import emptyCartList from "../../../../assets/img/empty.png";
import { useAuthContext } from "../../../../context/AuthContext";
import { useCartContext } from "../../../../context/CartContext";
import Colors from "../../../../shared/theme/Colors";
import CartItem from "../../../components/buyer/CartItem";

const CartList = ({ navigation }) => {
  const {
    cart,
    resetCart,
    editProductQuantity,
    addProductQuantity,
    subtractProductQuantity,
    removeFromCart,
  } = useCartContext();

  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getStoreId = () => cart[0].storeId;

  const getTotalAmountToPay = () =>
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  const handleCheckout = () => {
    navigation.navigate("BuyerCheckoutScreen");
  };
  return (
    <Box flex={1} p={4} mb={90}>
      {cart.length == 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Image
            source={emptyCartList}
            w={200}
            h={200}
            alt={"Empty Cart List"}
          />
          <Text fontFamily={"Poppins_400Regular"}>No products in cart</Text>
        </Box>
      ) : (
        <>
          <ScrollView flex={1} bg={"white"} p={2} rounded={"lg"}>
            {cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </ScrollView>
          <Box>
            <VStack py={2}>
              <HStack justifyContent={"space-between"}>
                <Text fontFamily={"Poppins_600SemiBold"} fontSize={"md"}>
                  Total Amount
                </Text>
                <Text fontFamily={"Poppins_600SemiBold"} fontSize={"md"}>
                  ₱ {getTotalAmountToPay()}
                </Text>
              </HStack>
              <Box mt={2}>
                <Button
                  rounded={"full"}
                  bg={Colors.secondary}
                  onPress={handleCheckout}
                >
                  <Text fontFamily={"Poppins_500Medium"}>Checkout</Text>
                </Button>
              </Box>
            </VStack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartList;

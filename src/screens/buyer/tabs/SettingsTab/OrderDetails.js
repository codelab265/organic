import { Box, Divider, HStack, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../../shared/theme/Colors";

const OrderDetails = ({ route }) => {
  const { order } = route.params;
  return (
    <Box flex={1}>
      <ScrollView>
        <Box>
          <HStack
            px={4}
            py={8}
            bg={Colors.primary}
            roundedBottom={"3xl"}
            alignItems={"center"}
          >
            <Box
              w={45}
              h={45}
              bg={"white"}
              rounded={"md"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <FontAwesome
                name="shopping-basket"
                color={Colors.primary}
                size={20}
              />
            </Box>
            <VStack pl={2}>
              <Text color={"white"} fontFamily={"Poppins_600SemiBold"}>
                #{order.order_id}
              </Text>
              <Text color={"gray.100"} fontFamily={"Poppins_500Medium"}>
                ₱ {parseFloat(order.total_amount).toFixed(2)}
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Box px={4}>
          <Box mt={8}>
            <Text
              fontSize={"lg"}
              fontFamily={"Poppins_600SemiBold"}
              color={Colors.blue}
            >
              Order Items
            </Text>
          </Box>
          <Divider my={1} />
          <Box>
            {order.order_item.map((item) => (
              <HStack
                key={item.id}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={1}
              >
                <Text
                  fontSize={"sm"}
                  fontFamily={"Poppins_400Regular"}
                  color={Colors.black}
                >
                  {item.product.product_name}
                </Text>
                <Text
                  color={Colors.primaryDark}
                  fontSize={"xs"}
                  fontFamily={"Poppins_400Regular"}
                >
                  ₱ {parseFloat(item.product.price * item.quantity)}
                </Text>
              </HStack>
            ))}
          </Box>

          <Box mt={8}>
            <Text
              fontSize={"lg"}
              fontFamily={"Poppins_600SemiBold"}
              color={Colors.blue}
            >
              Shipping Details
            </Text>
          </Box>
          <Divider my={1} />
          <Box>
            <VStack mb={1}>
              <Text
                fontSize={"md"}
                fontFamily={"Poppins_500Medium"}
                color={Colors.black}
              >
                House Number
              </Text>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                fontFamily={"Poppins_400Regular"}
              >
                {order.house_number}
              </Text>
            </VStack>

            <VStack mb={1}>
              <Text
                fontSize={"md"}
                fontFamily={"Poppins_500Medium"}
                color={Colors.black}
              >
                Street Number
              </Text>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                fontFamily={"Poppins_400Regular"}
              >
                {order.street_number}
              </Text>
            </VStack>
            <VStack mb={1}>
              <Text
                fontSize={"md"}
                fontFamily={"Poppins_500Medium"}
                color={Colors.black}
              >
                City
              </Text>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                fontFamily={"Poppins_400Regular"}
              >
                {order.city}
              </Text>
            </VStack>
            <VStack mb={1}>
              <Text
                fontSize={"md"}
                fontFamily={"Poppins_500Medium"}
                color={Colors.black}
              >
                Province
              </Text>
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                fontFamily={"Poppins_400Regular"}
              >
                {order.province}
              </Text>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OrderDetails;

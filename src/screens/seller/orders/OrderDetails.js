import {
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../shared/theme/Colors";
import { useNavigation } from "@react-navigation/native";

const OrderDetails = ({ route }) => {
  const { order } = route.params;
  const navigation = useNavigation();

  return (
    <Box flex={1} mb={85} bg="white">
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
              <FontAwesome name="user" color={Colors.primary} size={20} />
            </Box>
            <HStack
              flex={1}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <VStack pl={2}>
                <Text color={"white"} fontFamily={"Poppins_600SemiBold"}>
                  {order.buyer.name}
                </Text>
                <Text color={"gray.100"} fontFamily={"Poppins_500Medium"}>
                  {order.buyer.phone_number}
                </Text>
              </VStack>
              <Box>
                <Button
                  size={"sm"}
                  px={8}
                  rounded={"full"}
                  bg={Colors.yellow}
                  onPress={() =>
                    navigation.navigate("SellerMessagingScreen", {
                      buyer: order.buyer,
                    })
                  }
                >
                  <Text fontFamily={"Poppins_500Medium"}>Message</Text>
                </Button>
              </Box>
            </HStack>
          </HStack>
        </Box>
        <HStack px={4} mt={8} w={"full"} justifyContent={"space-between"}>
          <Text
            fontSize={"lg"}
            fontFamily={"Poppins_600SemiBold"}
            color={Colors.blue}
          >
            Order ID
          </Text>
          <Text fontFamily={"Poppins_500Medium"}>#{order.order_id}</Text>
        </HStack>
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
                  fontFamily={"Poppins_500Medium"}
                >
                  ₱ {parseFloat(item.product.price * item.quantity)}
                </Text>
              </HStack>
            ))}
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text fontFamily={"Poppins_500Medium"}>Total Amount</Text>
              <Text fontFamily={"Poppins_500Medium"}>
                ₱ {parseFloat(order.total_amount)}
              </Text>
            </HStack>
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

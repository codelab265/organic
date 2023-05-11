import React, { Component } from "react";
import { Avatar, Box, HStack, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import Colors from "../../../shared/theme/Colors";
import { FontAwesome } from "@expo/vector-icons";

const OrderItem = ({ order, onPress }) => {
  return (
    <TouchableOpacity  onPress={onPress}>
      <HStack bg={"white"} rounded={"lg"} px={2} py={4} mb={2} borderWidth={1} borderColor={'gray.300'}>
        <Avatar bg={Colors.secondary}>
          <FontAwesome name="shopping-basket" size={20} color={"white"} />
        </Avatar>
        <Box flex={1} flexDir={"row"} justifyContent={"space-between"} pl={2}>
          <VStack>
            <Text fontFamily={"Poppins_600SemiBold"}>#{order.order_id}</Text>
            <Text fontFamily={"Poppins_600SemiBold"} color={"gray.400"}>
              {moment(order.created_at).format("MMMM DD, YYYY - h:mm:ss")}
            </Text>
          </VStack>
          <Box>
            <Text fontFamily={"Poppins_600SemiBold"}>
              ₱ {parseFloat(order.total_amount)}
            </Text>
          </Box>
        </Box>
      </HStack>
    </TouchableOpacity>
  );
};

export default OrderItem;

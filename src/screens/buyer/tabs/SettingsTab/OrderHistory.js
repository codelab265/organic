import {
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../../shared/theme/Colors";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../../context/AuthContext";
import { Alert } from "react-native";
import emptyOrder from "../../../../assets/img/empty.png";
import moment from "moment/moment";

const OrderHistory = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/buyer/orders/${userDetails.id}`)
      .then((response) => {
        setLoading(false);
        setOrders(response.data);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("something went wrong");
        console.error(error.message);
      });
  };
  return (
    <Box flex={1} p={4}>
      {loading && (
        <Center mb={2}>
          <Spinner />
        </Center>
      )}

      {!loading && orders.length == 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Image
            source={emptyOrder}
            w={150}
            height={150}
            alt={"empty products"}
          />
          <Text fontFamily={"Poppins_400Regular"} color={Colors.primary}>
            You don't have any order
          </Text>
        </Box>
      ) : (
        <ScrollView>
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              onPress={() =>
                navigation.navigate("BuyerOrderDetailsScreen", { order: order })
              }
            >
              <HStack bg={"white"} rounded={"lg"} p={2} mb={2}>
                <Avatar bg={Colors.secondary}>
                  <FontAwesome
                    name="shopping-basket"
                    size={20}
                    color={"white"}
                  />
                </Avatar>
                <Box
                  flex={1}
                  flexDir={"row"}
                  justifyContent={"space-between"}
                  pl={2}
                >
                  <VStack>
                    <Text fontFamily={"Poppins_600SemiBold"}>
                      #{order.order_id}
                    </Text>
                    <Text fontFamily={"Poppins_600SemiBold"} color={"gray.400"}>
                      {moment(order.created_at).format(
                        "MMMM DD, YYYY - h:mm:ss"
                      )}
                    </Text>
                  </VStack>
                  <Box>
                    <Text fontFamily={"Poppins_600SemiBold"}>
                      ₱ {parseFloat(order.total_amount).toFixed(2)}
                    </Text>
                  </Box>
                </Box>
              </HStack>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Box>
  );
};

export default OrderHistory;

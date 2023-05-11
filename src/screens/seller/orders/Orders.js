import React, { useState, useEffect } from "react";
import { Box, Center, Divider, Spinner, Text } from "native-base";
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { FlatList } from "react-native";
import OrderItem from "../../components/seller/OrderItem";

const Orders = ({ navigation }) => {
  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/seller/orders/${userDetails.id}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <Box flex={1} mb={85} bg={"white"} p={4}>
      {loading && (
        <Center>
          <Spinner size={"sm"} />
        </Center>
      )}
      {!loading && orders.length === 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Text
            fontFamily={"Poppins_600SemiBold"}
            color={"gray.500"}
            fontSize={"lg"}
          >
            No available orders!!
          </Text>
        </Box>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderItem
              order={item}
              onPress={() =>
                navigation.navigate("SellerOrderDetailsScreen", {
                  order: item,
                })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

export default Orders;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "native-base";
import axios from "axios";
import Colors from "../../../shared/theme/Colors";
import Product from "../../components/buyer/Product";
import EmptyImage from "../../../assets/img/empty.png";
import OrderImage from "../../../assets/img/order.png";
import { useAuthContext } from "../../../context/AuthContext";
import OrderItem from "../../components/seller/OrderItem";

const Home = () => {
  const { userDetails } = useAuthContext();
  const userID = useMemo(() => userDetails.id, [userDetails.id]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getProducts = useCallback(() => {
    setProductLoading(true);
    axios
      .get(`${BASE_URL}/seller/products/${userID}`)
      .then((response) => {
        setProductLoading(false);
        setProducts(response.data);
      })
      .catch((error) => {
        setProductLoading(false);
        console.log(error);
      });
  }, [userID]);

  useEffect(() => {
   
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    getProducts();
  }, [getProducts,isFocused]);

  const getOrders = useCallback(() => {
    setOrderLoading(true);
    axios
      .get(`${BASE_URL}/seller/orders/${userID}`)
      .then((response) => {
        const OrderData = response.data;
        setOrders(OrderData.slice(0, 2));
        setOrderLoading(false);
      })
      .catch((error) => {
        setOrderLoading(false);
        console.log(error);
      });
  }, [userID]);

  return (
    <Box flex={1} mb={90}>
      <Box px={4} py={8} bg={Colors.primary} roundedBottom={"2xl"}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <VStack>
            <Text fontFamily={"Poppins_400Regular"} color={"white"} fontSize={'md'}>
              Welcome,{" "}
            </Text>
            <Text
              fontFamily={"Poppins_600SemiBold"}
              color={"white"}
              fontSize={"lg"}
            >
              {userDetails.name}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Box>
        <HStack
          px={4}
          justifyContent={"space-between"}
          mt={4}
          alignItems={"center"}
        >
          <Text
            fontFamily={"Poppins_500Medium"}
            color={Colors.primaryBlue}
            fontSize={"md"}
          >
            Recent Orders
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('SellerOrdersScreen')}>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box mt={4} px={4}>
          {orderLoading && (
            <Center>
              <Spinner size={"sm"} />
            </Center>
          )}
          {!orderLoading && orders.length === 0 ? (
            <VStack
              h={180}
              w={"full"}
              bg={"white"}
              justifyContent={"center"}
              alignItems={"center"}
              overflow={"hidden"}
              rounded={"lg"}
            >
              <Center p={10}>
                <Image
                  source={OrderImage}
                  w={120}
                  height={120}
                  alt={"empty shop"}
                />
                <Text fontFamily={"Poppins_400Regular"} color={Colors.primary}>
                  You dont have any order
                </Text>
              </Center>
            </VStack>
          ) : (
            orders.map((item, index) => (
              <OrderItem
                order={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate("SellerOrderDetailsScreen", {
                    order: item,
                  })
                }
              />
            ))
          )}
        </Box>
      </Box>
      <Box flex={1}>
        <HStack
          px={4}
          justifyContent={"space-between"}
          mt={4}
          alignItems={"center"}
        >
          <Text
            fontFamily={"Poppins_500Medium"}
            color={Colors.primaryBlue}
            fontSize={"md"}
          >
            Your Products
          </Text>
          <TouchableOpacity>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box flex={1} mt={4} px={4} justifyContent={"center"}>
          {productLoading && (
            <Spinner size={"sm"} color={Colors.primaryDark} mb={1} />
          )}

          {!productLoading && products.length === 0 ? (
            <Center p={5}>
              <Image
                source={EmptyImage}
                w={150}
                height={150}
                alt={"empty products"}
              />
              <Text fontFamily={"Poppins_400Regular"} color={Colors.primary}>
                No products added
              </Text>
            </Center>
          ) : (
            <FlatList
              numColumns={2}
              renderItem={({ item }) => <Product item={item} />}
              data={products}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

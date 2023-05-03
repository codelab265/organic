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
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../shared/theme/Colors";
import OrderImage from "../../../assets/img/order.png";
import Product from "../../components/buyer/Product";
import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import EmptyImage from "../../../assets/img/empty.png";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const { userDetails } = useAuthContext();
  const userID = userDetails.id;
  const [products, setProducts] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  const getProducts = () => {
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
  };

  return (
    <Box flex={1} mb={90}>
      <Box px={4} py={8} bg={Colors.primary} roundedBottom={"2xl"}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <VStack>
            <Text fontFamily={"Poppins_400Regular"} color={"white"}>
              Welcome,{" "}
            </Text>
            <Text
              fontFamily={"Poppins_600SemiBold"}
              color={"white"}
              fontSize={"md"}
            >
              {userDetails.name}
            </Text>
          </VStack>
          <Box>
            <TouchableOpacity>
              <Avatar size={"sm"} source={{ uri:`${BASE_URL2}/${userDetails.img_url}` }} />
            </TouchableOpacity>
          </Box>
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
            Available Orders
          </Text>
          <TouchableOpacity>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box mt={4} px={4}>
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
        <Box flex={1} mt={4} px={4} justifyContent={'center'}>
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

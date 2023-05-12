import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Center, Image, Spinner, Text } from "native-base";
import EmptyProducts from "../../../assets/img/empty.png";
import { useAuthContext } from "../../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Product from "../../components/buyer/Product";
import { FlatList } from "react-native";

const Products = ({ navigation }) => {
  const { userDetails } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const userID = useMemo(() => userDetails.id, [userDetails.id]);
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/seller/products/${userID}`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [userID]);

  useEffect(() => {
    getProducts();
  }, [getProducts, isFocused]);

  return (
    <Box flex={1} mb={85}>
      {loading && (
        <Center my={2}>
          <Spinner size={"sm"} />
        </Center>
      )}

      {!loading && products.length === 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Image source={EmptyProducts} w={200} h={200} alt={"empty"} />
          <Text
            fontFamily={"Poppins_500Medium"}
            fontSize={"md"}
            color={"gray.400"}
          >
            No products available
          </Text>
        </Box>
      ) : (
        <Box flex={1} justifyContent={"center"} p={4}>
          <FlatList
            numColumns={2}
            renderItem={({ item }) => (
              <Product
                item={item}
                press={() =>
                  navigation.navigate("SellerProductsDetailScreen", {
                    product: item,
                  })
                }
              />
            )}
            data={products}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: "space-between" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Products;

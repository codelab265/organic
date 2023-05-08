import React from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Divider,
  Button,
  Image,
  FlatList,
  Flex,
} from "native-base";
import Colors from "../../../../shared/theme/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Product from "../../../components/buyer/Product";

const ShopDetails = ({ route, navigation }) => {
  const { shop } = route.params;
  const products = shop.product;
  return (
    <Box flex={1}>
      <Box bg={"white"} p={4}>
        <HStack>
          <Box w={90} h={90} bg={"gray.200"} rounded={"lg"}>
            <Image
              source={{ uri: `${BASE_URL2}/${shop.img_url}` }}
              alt={shop.name}
              w={"full"}
              h={"full"}
              resizeMode={"cover"}
              rounded={"md"}
            />
          </Box>
          <Box
            px={4}
            flex={1}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <VStack>
                <Text fontFamily={"Poppins_600SemiBold"} fontSize={"lg"}>
                  {shop.store_name}
                </Text>
              </VStack>
              <HStack>
                <Text fontFamily={"Poppins_400Regular"}>{shop.name}</Text>
              </HStack>
            </Box>
            <HStack alignItems={"center"}>
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                w={7}
                h={7}
                bg={Colors.primary}
                rounded={"md"}
              >
                <FontAwesome name="phone" size={14} color="white" />
              </Box>
              <Box pl={"2"}>
                <Text fontFamily={"Poppins_500Medium"} color={"gray.400"}>
                  {shop.phone_number}
                </Text>
              </Box>
            </HStack>
          </Box>
        </HStack>
        <Divider my={4} />
        <HStack justifyContent={"space-evenly"} w={"full"}>
          <TouchableOpacity>
            <HStack
              bg={Colors.blue}
              rounded={"full"}
              px={5}
              py={2}
              alignItems={"center"}
              w={"full"}
            >
              <FontAwesome name="envelope" size={14} color={"white"} />
              <Text ml={2} fontFamily={"Poppins_500Medium"} color={"white"}>
                Message
              </Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity>
            <HStack
              bg={Colors.orange}
              rounded={"full"}
              px={5}
              py={2}
              alignItems={"center"}
              w={"full"}
            >
              <FontAwesome name="map-marker" size={14} color={"white"} />
              <Text ml={2} fontFamily={"Poppins_500Medium"} color={"white"}>
                Location
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </Box>
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
          Seller Products
        </Text>
        <TouchableOpacity>
          <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
            See all
          </Text>
        </TouchableOpacity>
      </HStack>
      <Box flex={1} mt={4} mb={90} px={4}>
        {products.length > 0 ? (
          <FlatList
            numColumns={2}
            renderItem={({ item }) => <Product item={item} press={()=>navigation.navigate('BuyerProductDetailsScreen', {product:item})} />}
            data={products}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <Text
              fontFamily={"Poppins_600SemiBold"}
              fontSize={"lg"}
              color={"gray.400"}
            >
              No products added
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ShopDetails;

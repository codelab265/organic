import React, { useState } from "react";
import {
  Box,
  Button,
  Circle,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../shared/theme/Colors";
import axios from "axios";
import { Alert } from "react-native";
import { ToastAndroid } from "react-native";
import DeleteModal from "../../components/seller/DeleteModal";

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const DeleteProduct = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/seller/product/delete`, {product_id: product.id})
      .then((response) => {
        setLoading(false);
        onClose();
        ToastAndroid.show("Delete successfully", ToastAndroid.LONG);
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
        onClose();
        Alert.alert('error', 'Something went wrong');
        console.error(error);

      });
  };

  return (
    <Box flex={1}>
      <Box flex={1} position={"relative"}>
        <Image
          source={{ uri: `${BASE_URL2}/${product.product_image}` }}
          alt={product.product_name}
          resizeMode={"cover"}
          w={"full"}
          h={"full"}
        />
        <Circle
          bg={"white"}
          w={35}
          h={35}
          position={"absolute"}
          top={2}
          left={4}
        >
          <Text fontFamily={"Poppins_500Medium"}>{product.quantity}</Text>
        </Circle>
        <Box
          bg={"white"}
          position={"absolute"}
          top={2}
          right={4}
          px={3}
          py={2}
          alignItems={"center"}
          justifyContent={"center"}
          rounded={"full"}
        >
          <Text fontFamily={"Poppins_500Medium"}>{`₱ ${product.price}`}</Text>
        </Box>
        <Box position="absolute" bottom={2} right={4}>
          <Button rounded={"full"} bg={"white"} shadow={"3"} mb={2}>
            <FontAwesome name="pencil" />
          </Button>
          <Button rounded={"full"} bg={"white"} shadow={"3"} onPress={onClose}>
            <FontAwesome name="trash" />
          </Button>
        </Box>
      </Box>
      <Box flex={2} p={4}>
        <ScrollView>
          <VStack mb={4}>
            <Text
              fontSize={"lg"}
              fontFamily={"Poppins_500Medium"}
              color={Colors.blue}
            >
              Product name
            </Text>
            <Text
              fontSize={"sm"}
              fontFamily={"Poppins_500Medium"}
              color={Colors.blue}
            >
              {product.product_name}
            </Text>
          </VStack>

          <VStack>
            <Text
              fontSize={"lg"}
              fontFamily={"Poppins_500Medium"}
              color={Colors.blue}
            >
              Product Description
            </Text>
            <Text
              fontSize={"sm"}
              fontFamily={"Poppins_500Medium"}
              color={Colors.blue}
            >
              {product.product_description}
            </Text>
          </VStack>
          <DeleteModal Delete={DeleteProduct} Loading={loading} Open={isOpen} onClose={onClose}/>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ProductDetails;

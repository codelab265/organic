import React from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  TextField,
} from "native-base";
import Colors from "../../../../shared/theme/Colors";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useCartContext } from "../../../../context/CartContext";
import { useAuthContext } from "../../../../context/AuthContext";

const Checkout = ({ navigation }) => {
  const { cart, resetCart } = useCartContext();
  const { userDetails } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const getSellerId = () => cart[0].product.seller_id;
  const getTotalAmountToPay = () =>
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  const validation = Yup.object({
    houseNumber: Yup.string().required("House number is required"),
    streetNumber: Yup.string().required("Street number is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
  });

  const handleOrder = (values, resetForm) => {
    setLoading(true);
    const data = {
      buyer: {
        ...userDetails,
        house_number: values.houseNumber,
        city: values.city,
        street_number: values.streetNumber,
        province: values.province,
      },
      items: cart,
      total_amount: getTotalAmountToPay(),
      total_items: cart.length,
      seller: getSellerId(),
    };

    axios
      .post(`${BASE_URL}/buyer/create-order`, data)
      .then((response) => {
        resetForm();
        resetCart();
        setLoading(false);
        navigation.replace('BuyerSuccessOrderScreen');
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Alert.alert("error", "something went wrong");
      });
  };

  return (
    <Box flex={1}>
      <Box px={4} py={8} bg={Colors.primary} roundedBottom={"2xl"}>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text
            fontSize={"md"}
            fontFamily={"Poppins_600SemiBold"}
            color={"white"}
          >
            Number of items
          </Text>
          <Text
            fontSize={"sm"}
            fontFamily={"Poppins_400Regular"}
            color={"white"}
          >
            {cart?.length}
          </Text>
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"center"} mt={2}>
          <Text
            fontSize={"md"}
            fontFamily={"Poppins_600SemiBold"}
            color={"white"}
          >
            Total amount
          </Text>
          <Text
            fontSize={"sm"}
            fontFamily={"Poppins_400Regular"}
            color={"white"}
          >
            ₱ {getTotalAmountToPay()}
          </Text>
        </HStack>
      </Box>
      <Box flex={1} p={4}>
        <Box>
          <Text
            fontSize={"md"}
            fontFamily={"Poppins_600SemiBold"}
            color={"gray.500"}
          >
            Provide shipping details
          </Text>
        </Box>
        <Divider my={2} />
        <Box flex={1} pt={2}>
          <ScrollView>
            <Formik
              initialValues={{
                houseNumber: "",
                streetNumber: "",
                city: "",
                province: "",
              }}
              validationSchema={validation}
              onSubmit={(values, { resetForm }) =>
                handleOrder(values, resetForm)
              }
            >
              {({ errors, values, handleChange, touched, handleSubmit }) => (
                <>
                  <Box>
                    {errors.houseNumber && touched.houseNumber && (
                      <Text color={"red.500"} fontFamily="Poppins_400Regular">
                        {errors.houseNumber}
                      </Text>
                    )}
                    <TextField
                      placeholder="House number"
                      fontFamily={"Poppins_400Regular"}
                      fontSize={"md"}
                      bg={"white"}
                      value={values.houseNumber}
                      onChangeText={handleChange("houseNumber")}
                    />
                  </Box>

                  <Box>
                    {errors.streetNumber && touched.streetNumber && (
                      <Text color={"red.500"} fontFamily="Poppins_400Regular">
                        {errors.streetNumber}
                      </Text>
                    )}
                    <TextField
                      placeholder="Street Number"
                      fontFamily={"Poppins_400Regular"}
                      fontSize={"md"}
                      bg={"white"}
                      value={values.streetNumber}
                      onChangeText={handleChange("streetNumber")}
                    />
                  </Box>

                  <Box>
                    {errors.city && touched.city && (
                      <Text color={"red.500"} fontFamily="Poppins_400Regular">
                        {errors.city}
                      </Text>
                    )}
                    <TextField
                      placeholder="City"
                      fontFamily={"Poppins_400Regular"}
                      fontSize={"md"}
                      bg={"white"}
                      value={values.city}
                      onChangeText={handleChange("city")}
                    />
                  </Box>
                  <Box>
                    {errors.province && touched.province && (
                      <Text color={"red.500"} fontFamily="Poppins_400Regular">
                        {errors.province}
                      </Text>
                    )}
                    <TextField
                      placeholder="Province"
                      fontFamily={"Poppins_400Regular"}
                      fontSize={"md"}
                      bg={"white"}
                      value={values.province}
                      onChangeText={handleChange("province")}
                    />
                  </Box>
                  <Box>
                    <Button
                      bg={Colors.secondary}
                      rounded={"full"}
                      size={"lg"}
                      onPress={handleSubmit}
                      isLoading={loading}
                      isLoadingText={"Submitting your order..."}
                      isDisabled={loading}
                    >
                      <Text fontFamily="Poppins_600SemiBold" color={"gray.600"}>
                        Confirm Order
                      </Text>
                    </Button>
                  </Box>
                </>
              )}
            </Formik>
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;

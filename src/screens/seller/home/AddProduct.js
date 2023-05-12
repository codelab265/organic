import {
  Box,
  Button,
  Center,
  HStack,
  Select,
  Text,
  TextField,
} from "native-base";
import React from "react";
import { ToastAndroid, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import { Alert } from "react-native";

const AddProduct = () => {
    const { userDetails } = useAuthContext();
    const [loading, setLoading] = useState(false);

  const validation = Yup.object({
    productName: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.string().required("Product price is required"),
    quantity: Yup.string().required("Product quantity is required"),
    imageUrl: Yup.object().required("Product image is required"),
  });

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("product_name", values.productName);
      formData.append("product_description", values.description);
      formData.append("price", values.price);
      formData.append("seller_id", userDetails.id);
      formData.append("quantity", values.quantity);
      const uri =
        Platform.OS === "android"
          ? values.imageUrl.uri
          : values.imageUrl.uri.replace("file://", "");
      const filename = values.imageUrl.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      const img = { uri: uri, name: `image.${ext}`, type: type };
      console.log(img);
      formData.append("product_image", img);

      const config = {
        method: "POST",
        url: `${BASE_URL}/seller/add-product`,
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
          // if backend supports u can use gzip request encoding
          // "Content-Encoding": "gzip",
        },
        transformRequest: (data, headers) => {
          // !!! override data to return formData
          // since axios converts that to string
          return formData;
        },

        data: formData,
      };

      const response = await axios.request(config);

      console.log(response.data.data);
      ToastAndroid.show("Added successfully", ToastAndroid.LONG);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Registration failed:", error.message);
      throw error;
      // Handle error, e.g. display error message
    }
  };

  const pickImage = async (setFieldValue) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setFieldValue("imageUrl", result.assets[0]);
      }
    } catch (error) {
      console.error("Failed to pick an image:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1}}>
        <Box padding={4} flex={1}>
          <Center flex={1} mb={20} mt={10}>
            <Formik
              initialValues={{
                productName: "",
                description: "",
                price: "",
                quantity: "",
                imageUrl: "",
              }}
              validationSchema={validation}
              onSubmit={(values, { resetForm }) => {
                handleRegister(values);
                resetForm();
              }}
            >
              {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                touched,
                setFieldValue,
                setTouched,
                resetForm,
                errors,
              }) => (
                <>
                  {errors.categoryId && touched.categoryId && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.categoryId}
                    </Text>
                  )}
                  {errors.productName && touched.productName && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.productName}
                    </Text>
                  )}
                  <TextField
                    value={values.productName}
                    onChangeText={handleChange("productName")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Product Name"}
                    keyboardType={"default"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    
                  />

                  {errors.description && touched.description && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.description}
                    </Text>
                  )}
                  <TextField
                    value={values.description}
                    onChangeText={handleChange("description")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Description"}
                    keyboardType={"default"}
                    fontFamily={"Poppins_400Regular"}
                    fontSize={"md"}
                    p={"3"}
                    
                  />

                  {errors.quantity && touched.quantity && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.quantity}
                    </Text>
                  )}
                  <TextField
                    value={values.quantity}
                    onChangeText={handleChange("quantity")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Quantity"}
                    keyboardType={"number-pad"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    
                  />

                  {errors.price && touched.price && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.price}
                    </Text>
                  )}
                  <TextField
                    value={values.price}
                    onChangeText={handleChange("price")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Price"}
                    keyboardType={"numeric"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    
                  />

                 

                  {errors.imageUrl && touched.imageUrl && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.imageUrl}
                    </Text>
                  )}
                  <Button
                    onPress={() => {
                      pickImage(setFieldValue);
                    }}
                    width={"full"}
                    bg={"gray.200"}
                    mb={2}
                  >
                    <Text color={"gray.600"} fontFamily={"Poppins_400Regular"}>
                      {" "}
                      <FontAwesome name="file" size={15} /> Choose image...
                    </Text>
                  </Button>

                  {values.imageUrl && (
                    <Image
                      source={{ uri: values.imageUrl.uri }}
                      style={{ width: 100, height: 100, marginBottom: 10 }}
                      alt={"shopImage"}
                    />
                  )}

                  <Button
                    w={"full"}
                    rounded={"full"}
                    size={"lg"}
                    bg={"#86B084"}
                    onPress={handleSubmit}
                    isLoading={loading}
                    isLoadingText={"Submitting..."}
                    isDisabled={loading}
                  >
                    <Text
                      fontSize={"lg"}
                      color={"white"}
                      fontFamily={"Poppins_600SemiBold"}
                    >
                      Save product
                    </Text>
                  </Button>
                </>
              )}
            </Formik>
          </Center>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProduct;

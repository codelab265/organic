import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  TextField,
  Button,
  Image,
  Select,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../../shared/theme/Colors";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import * as Location from "expo-location";
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SellerRegister = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const FormData = global.FormData;
  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const validation = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5).max(10),
    phoneNumber: Yup.string().required("Phone number is required"),
    storeName: Yup.string().required("Store name is required"),
    categoryId: Yup.string().required("Select a category"),
    imageUrl: Yup.object().required("Image is required"),
  });

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("latitude", location?.coords.latitude);
      formData.append("longitude", location?.coords.longitude);
      formData.append("storeName", values.storeName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("category_id", values.categoryId);
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
      formData.append("image_uri", img);

      const config = {
        method: "POST",
        url: `${BASE_URL}/seller/register`,
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
      Alert.alert("Message", "Registers successfully");
      setImage("");
      setLoading(false);
      const data = JSON.stringify(response.data.data);
      await AsyncStorage.setItem("user", data);
      await AsyncStorage.setItem("login", "true");
      navigation.reset({ index: 0, routes: [{ name: "SellerTabs" }] });
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
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Box padding={4} flex={1} bg={"white"}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Center rounded={"full"} w={45} h={45} bg={"#86B084"}>
                <FontAwesome5
                  name="arrow-left"
                  size={20}
                  color="white"
                ></FontAwesome5>
              </Center>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("welcome")}>
              <Center rounded={"full"} w={45} h={45} bg={Colors.yellow}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color="white"
                ></FontAwesome5>
              </Center>
            </TouchableOpacity>
          </HStack>
          <Center flex={1} mb={20} mt={10}>
            <Box alignSelf={"flex-start"}>
              <Text mb={1} fontSize={"2xl"} bold color={"gray.600"}>
                Register
              </Text>
              <Text mb={10} fontSize={"md"} bold color={"gray.400"}>
                Please sign up to continue
              </Text>
            </Box>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                phoneNumber: "",
                storeName: "",
                categoryId: "",
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
                  <Select
                    selectedValue={values.categoryId}
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    mt={1}
                    mb={4}
                    w={"full"}
                    bg={"gray.200"}
                    fontFamily={"Poppins_400Regular"}
                    fontSize={"md"}
                    onValueChange={(itemValue) => {
                      setFieldValue("categoryId", itemValue);
                    }}
                  >
                    {categories.map((cat) => (
                      <Select.Item
                        label={cat.name}
                        value={cat.id}
                        key={cat.id}
                      />
                    ))}
                  </Select>

                  {errors.fullName && touched.fullName && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.fullName}
                    </Text>
                  )}
                  <TextField
                    value={values.fullName}
                    onChangeText={handleChange("fullName")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Full name"}
                    keyboardType={"email-address"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="user" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.email && touched.email && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.email}
                    </Text>
                  )}
                  <TextField
                    value={values.email}
                    onChangeText={handleChange("email")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    fontFamily={"Poppins_400Regular"}
                    fontSize={"md"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="at" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.phoneNumber}
                    </Text>
                  )}
                  <TextField
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Phone number"}
                    keyboardType={"phone-pad"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="phone" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.password && touched.password && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.password}
                    </Text>
                  )}
                  <TextField
                    value={values.password}
                    onChangeText={handleChange("password")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Password"}
                    keyboardType={"default"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="key" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.storeName && touched.storeName && (
                    <Text color={"red.500"} alignSelf={"flex-start"}>
                      {errors.storeName}
                    </Text>
                  )}
                  <TextField
                    value={values.storeName}
                    onChangeText={handleChange("storeName")}
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Store name"}
                    keyboardType={"default"}
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5
                          name="building"
                          size={18}
                          color="#86B084"
                        />
                      </Box>
                    }
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
                      <FontAwesome5 name="file" size={15} /> Choose image...
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
                      Proceed
                    </Text>
                  </Button>
                </>
              )}
            </Formik>
          </Center>

          <HStack justifyContent={"center"}>
            <Text fontSize={"md"} fontFamily={"Poppins_400Regular"}>
              ALREADY HAVE AN ACCOUNT?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SellerLogin")}
            >
              <Text
                color={"#86B084"}
                fontSize={"md"}
                fontFamily={"Poppins_600SemiBold"}
              >
                {" "}
                SIGN IN
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SellerRegister;

import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  TextField,
  Button,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import LoginImage from "../../assets/img/login.png";
import { ScrollView } from "react-native";
import Colors from "../../shared/theme/Colors";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useAuthContext } from "../../context/AuthContext";

const BuyerRegister = ({ navigation }) => {
  const [loading, setLoading] = useState();
  const { setIsLogged, setUserDetails } = useAuthContext();
  const FormData = global.FormData;

  const validation = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email is required").email(),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required").min(5),
  });

  const handleRegister = (values, resetForm) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/buyer/register`, {
        name: values.name,
        phone_number: values.phoneNumber,
        email: values.email,
        password: values.password,
      })
      .then(async (response) => {
        setLoading(false);
        Alert.alert("message", "Registered successfully");
        resetForm();
        const data = response.data.data;
        await AsyncStorage.setItem("user", JSON.stringify(data));
        await AsyncStorage.setItem("login", "true");
        setIsLogged("true");
        setUserDetails(response.data.data);
        navigation.reset({ index: 0, routes: [{ name: "BuyerTabs" }] });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Alert.alert("error", "Something went wrong");
      });
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
            <TouchableOpacity
              onPress={() => navigation.navigate("UserTypeScreen")}
            >
              <Center rounded={"full"} w={45} h={45} bg={Colors.yellow}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color="white"
                ></FontAwesome5>
              </Center>
            </TouchableOpacity>
          </HStack>
          <Center flex={1} mb={20} mt={20}>
            <Box alignSelf={"flex-start"}>
              <Text mb={1} fontSize={"2xl"} bold color={"gray.600"}>
                Buyer Register
              </Text>
              <Text mb={10} fontSize={"md"} bold color={"gray.400"}>
                Please sign up to continue
              </Text>
            </Box>
            <Formik
              initialValues={{
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
              }}
              validationSchema={validation}
              onSubmit={(values, { resetForm }) => {
                handleRegister(values, resetForm);
              }}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                touched,
                errors,
                resetForm,
              }) => (
                <>
                  {errors.name && touched.name && (
                    <Text
                      color={"red.500"}
                      alignSelf={"flex-start"}
                      fontFamily={"Poppins_500Medium"}
                    >
                      {errors.name}
                    </Text>
                  )}
                  <TextField
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Full name"}
                    keyboardType={"email-address"}
                    fontSize={"md"}
                    p={"3"}
                    value={values.name}
                    onChangeText={handleChange("name")}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="user" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.email && touched.email && (
                    <Text
                      color={"red.500"}
                      alignSelf={"flex-start"}
                      fontFamily={"Poppins_500Medium"}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <TextField
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    fontSize={"md"}
                    p={"3"}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="at" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text
                      color={"red.500"}
                      alignSelf={"flex-start"}
                      fontFamily={"Poppins_500Medium"}
                    >
                      {errors.phoneNumber}
                    </Text>
                  )}
                  <TextField
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Phone number"}
                    keyboardType={"phone-pad"}
                    fontSize={"md"}
                    p={"3"}
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="phone" size={18} color="#86B084" />
                      </Box>
                    }
                  />

                  {errors.password && touched.password && (
                    <Text
                      color={"red.500"}
                      alignSelf={"flex-start"}
                      fontFamily={"Poppins_500Medium"}
                    >
                      {errors.password}
                    </Text>
                  )}
                  <TextField
                    w={"full"}
                    bg={"gray.200"}
                    rounded={"lg"}
                    placeholder={"Password"}
                    keyboardType={"default"}
                    fontSize={"lg"}
                    p={"3"}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="key" size={18} color="#86B084" />
                      </Box>
                    }
                  />
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
                    <Text fontWeight={"bold"} fontSize={"lg"} color={"white"}>
                      Sign up
                    </Text>
                  </Button>
                </>
              )}
            </Formik>
          </Center>

          <HStack justifyContent={"center"}>
            <Text fontSize={"md"}>ALREADY HAVE AN ACCOUNT?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("BuyerLogin")}>
              <Text fontWeight={"bold"} color={"#86B084"} fontSize={"md"}>
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

export default BuyerRegister;

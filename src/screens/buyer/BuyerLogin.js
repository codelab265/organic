import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  TextField,
  Button,
  Image,
} from "native-base";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import LoginImage from "../../assets/img/login.png";
import { ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Alert } from "react-native";
import { useState } from "react";

const BuyerLogin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(5).max(10),
  });

  const handleLogin = (values) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/buyer/login`, {
        email: values.email,
        password: values.password,
      })
      .then(async (response) => {
        setLoading(false);
        if(response.data.status=="error"){
            Alert.alert('error', response.data.data);
        }else{
          const data = JSON.stringify(response.data.data);
          await AsyncStorage.setItem("user", data);
          await AsyncStorage.setItem("login", "true");
            navigation.reset({index:0, route:[{name: "BuyerTabs"}]})
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("error","Something went wrong");
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Box padding={4}  flex={1} bg={"white"}>
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
          </HStack>
          <Center flex={1} mb={20}>
            <Image
              source={LoginImage}
              alt="LoginImage"
              w={150}
              h={150}
              mb={5}
            />
            <Box alignSelf={"flex-start"}>
              <Text
                mb={1}
                fontSize={"2xl"}
                fontFamily="Poppins_600SemiBold"
                color={"gray.600"}
              >
                Buyer Login
              </Text>
              <Text
                mb={10}
                fontSize={"md"}
                fontFamily="Poppins_500Medium"
                color={"gray.400"}
              >
                Please sign in to continue
              </Text>
            </Box>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}

              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleLogin(values);
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
                  {errors.email && touched.email && (
                    <Text
                      fontFamily={"Poppins_400Regular"}
                      color={"red.500"}
                      alignSelf={"flex-start"}
                    >
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
                    fontSize={"md"}
                    fontFamily={"Poppins_400Regular"}
                    p={"3"}
                    InputLeftElement={
                      <Box ml={2}>
                        <FontAwesome5 name="at" size={18} color="#86B084" />
                      </Box>
                    }
                  />
                  {errors.password && touched.password && (
                    <Text
                      fontFamily={"Poppins_400Regular"}
                      color={"red.500"}
                      alignSelf={"flex-start"}
                    >
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
                  <Button
                    w={"full"}
                    rounded={"full"}
                    size={"lg"}
                    bg={"#86B084"}
                    onPress={handleSubmit}
                    isLoading={loading}
                    isLoadingText={"Authenticating..."}
                    isDisabled={loading}
                  >
                    <Text
                      fontFamily={"Poppins_500Medium"}
                      fontSize={"lg"}
                      color={"white"}
                    >
                      Login
                    </Text>
                  </Button>
                </>
              )}
            </Formik>
          </Center>

          <HStack justifyContent={"center"}>
            <Text fontSize={"md"} fontFamily={"Poppins_400Regular"}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("BuyerRegister")}
            >
              <Text
                fontFamily={"Poppins_600SemiBold"}
                color={"#86B084"}
                fontSize={"md"}
              >
                {" "}
                Sign up
              </Text>
            </TouchableOpacity>
          </HStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BuyerLogin;

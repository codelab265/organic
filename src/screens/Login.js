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
import LoginImage from "../assets/img/login.png";
import { ScrollView } from "react-native";
const Login = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "pan"}
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Box padding={4} mt={10} flex={1} bg={"white"}>
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
            <Box alignSelf={'flex-start'}>
              <Text mb={1} fontSize={"2xl"} bold color={"gray.600"}>
                Login
              </Text>
              <Text mb={10} fontSize={"md"} bold color={"gray.400"}>
                Please sign in to continue
              </Text>
            </Box>
            <TextField
              w={"full"}
              bg={"gray.200"}
              autoFocus
              rounded={"lg"}
              placeholder={"Email"}
              keyboardType={"email-address"}
              fontSize={"md"}
              p={"3"}
              InputLeftElement={
                <Box ml={2}>
                  <FontAwesome5 name="at" size={18} color="#86B084" />
                </Box>
              }
            />
            <TextField
              w={"full"}
              bg={"gray.200"}
              rounded={"lg"}
              placeholder={"Password"}
              keyboardType={"default"}
              secureTextEntry={true}
              fontSize={"lg"}
              p={"3"}
              InputLeftElement={
                <Box ml={2}>
                  <FontAwesome5 name="key" size={18} color="#86B084" />
                </Box>
              }
            />
            <Button w={"full"} rounded={"full"} size={"lg"} bg={"#86B084"}>
              <Text fontWeight={"bold"} fontSize={"lg"} color={"white"}>
                Login
              </Text>
            </Button>
          </Center>

          <VStack alignItems={"center"}>
            <Text fontSize={"lg"}>
              Don't have an account?
              <Text fontWeight={"bold"} color={"#86B084"}>
                {" "}
                Sign up
              </Text>
            </Text>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

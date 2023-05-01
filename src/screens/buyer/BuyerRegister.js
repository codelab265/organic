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
import Colors from "../../shared/theme/Colors";
  const BuyerRegister = ({ navigation }) => {
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
              <TouchableOpacity onPress={() => navigation.navigate('welcome')}>
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
              <Box alignSelf={'flex-start'}>
                <Text mb={1} fontSize={"2xl"} bold color={"gray.600"}>
                  Register
                </Text>
                <Text mb={10} fontSize={"md"} bold color={"gray.400"}>
                  Please sign up to continue
                </Text>
              </Box>
              <TextField
                w={"full"}
                bg={"gray.200"}
                rounded={"lg"}
                placeholder={"Full name"}
                keyboardType={"email-address"}
                fontSize={"md"}
                p={"3"}
                InputLeftElement={
                  <Box ml={2}>
                    <FontAwesome5 name="user" size={18} color="#86B084" />
                  </Box>
                }
              />
              <TextField
                w={"full"}
                bg={"gray.200"}
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
                placeholder={"Phone number"}
                keyboardType={"phone-pad"}
                fontSize={"md"}
                p={"3"}
                InputLeftElement={
                  <Box ml={2}>
                    <FontAwesome5 name="phone" size={18} color="#86B084" />
                  </Box>
                }
              />
              <TextField
                w={"full"}
                bg={"gray.200"}
                rounded={"lg"}
                placeholder={"Password"}
                keyboardType={"default"}
                fontSize={"lg"}
                p={"3"}
                InputLeftElement={
                  <Box ml={2}>
                    <FontAwesome5 name="key" size={18} color="#86B084" />
                  </Box>
                }
              />
              <Button w={"full"} rounded={"full"} size={"lg"} bg={"#86B084"} onPress={()=>navigation.navigate('buyerHome')}>
                <Text fontWeight={"bold"} fontSize={"lg"} color={"white"}>
                  Proceed
                </Text>
              </Button>
            </Center>
  
            <HStack justifyContent={"center"}>
              <Text fontSize={'md'}>ALREADY HAVE AN ACCOUNT?</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('buyerLogin')}>
                <Text fontWeight={"bold"} color={"#86B084"} fontSize={'md'}>
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
  
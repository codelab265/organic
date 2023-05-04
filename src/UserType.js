import { Button, Image, Center, Text, Box, HStack, VStack } from "native-base";
import React from "react";
import Logo from "./assets/img/logo.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./shared/theme/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserType = ({ navigation }) => {
  const [item, setItem] = useState("");
  const [disable, setDisable] = useState(true);
  const [type, setType] = useState("");

  const handleClick = (e) => {
    setItem(e);
    setDisable(false);
    if (e == 1) {
      setType("BuyerLogin");
    }
    if (e == 2) {
      setType("SellerLogin");
    }
  };

  const handleNavigation = () => {
    navigation.navigate(type);
  };

  return (
    <Box flex={1} bg={"white"}>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <Image source={Logo} alt={"alt"} w={100} h={100} rounded={"lg"} />
        <Text
          fontSize={"lg"}
          fontFamily="Poppins_600SemiBold"
          color={Colors.blue}
          mt={2}
        >
          Organic Connect
        </Text>
      </Box>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <HStack space={4}>
          <TouchableWithoutFeedback onPress={() => handleClick(1)}>
            <VStack alignItems={"center"}>
              <Box
                w={90}
                h={90}
                alignItems={"center"}
                justifyContent={"center"}
                bg={item === 1 ? Colors.primary : "gray.100"}
                rounded={"lg"}
                shadow={"1"}
              >
                <FontAwesome
                  name="user"
                  size={26}
                  color={item === 1 ? "white" : Colors.primary}
                />
              </Box>
              <Text mt={2} fontFamily={"Poppins_500Medium"} color={"gray.500"}>
                Buyer
              </Text>
            </VStack>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleClick(2)}>
            <VStack alignItems={"center"} onPress={() => handleClick(2)}>
              <Box
                w={90}
                h={90}
                alignItems={"center"}
                justifyContent={"center"}
                bg={item === 2 ? Colors.primary : "gray.100"}
                rounded={"lg"}
                shadow={"1"}
              >
                <FontAwesome
                  name="user-plus"
                  size={26}
                  color={item === 2 ? "white" : Colors.primary}
                />
              </Box>
              <Text mt={2} fontFamily={"Poppins_500Medium"} color={"gray.500"}>
                Seller
              </Text>
            </VStack>
          </TouchableWithoutFeedback>
        </HStack>
      </Box>
      <Box flex={1} p={4} justifyContent={"flex-end"}>
        <Button
          size={"lg"}
          rounded={"full"}
          bg={Colors.primary}
          rightIcon={
            <FontAwesome name="arrow-right" size={16} color={"white"} />
          }
          isDisabled={disable}
          onPress={handleNavigation}
        >
          <Text fontFamily={"Poppins_600SemiBold"} color={"white"}>
            Continue
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default UserType;

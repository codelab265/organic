import { Avatar, Box, Center, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../shared/theme/Colors";
import OrderImage from "../../../assets/img/order.png";
import Product from "../../components/buyer/Product";

const Home = ({ navigation }) => {
  return (
    <Box flex={1} mb={90}>
      <Box px={4} py={8} bg={Colors.primary} roundedBottom={"2xl"}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <VStack>
            <Text fontFamily={"Poppins_400Regular"} color={"white"}>
              Welcome,{" "}
            </Text>
            <Text
              fontFamily={"Poppins_600SemiBold"}
              color={"white"}
              fontSize={"md"}
            >
              Mphatso Mlenga
            </Text>
          </VStack>
          <Box>
            <TouchableOpacity>
              <Avatar size={"sm"} />
            </TouchableOpacity>
          </Box>
        </HStack>
      </Box>
      <Box>
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
            Available Orders
          </Text>
          <TouchableOpacity>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box mt={4} px={4}>
          <VStack
            h={200}
            w={"full"}
            bg={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            overflow={"hidden"}
            rounded={"lg"}
          >
            <Center p={10}>
              <Image
                source={OrderImage}
                w={120}
                height={120}
                alt={"empty shop"}
              />
              <Text fontFamily={"Poppins_500Medium"} color={Colors.primary}>
                You dont have any order
              </Text>
            </Center>
          </VStack>
        </Box>
      </Box>
      <Box flex={1}>
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
            Your Products
          </Text>
          <TouchableOpacity>
            <Text fontFamily={"Poppins_400Regular"} color={Colors.primaryDark}>
              See all
            </Text>
          </TouchableOpacity>
        </HStack>
        <Box
          flex={1}
          flexDirection={"row"}
          justifyContent="space-evenly"
          mt={4}
        >
          <Product />
          <Product />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

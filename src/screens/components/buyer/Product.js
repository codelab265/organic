import React from "react";
import { Box, HStack, Text, Image } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Colors from "../../../shared/theme/Colors";

const Product = ({ item, press }) => {
  const Width = Dimensions.get("screen").width;
  return (
    <TouchableOpacity onPress={press}>
      <Box
        w={Width / 2 - 22}
        bg={"white"}
        p={2}
        rounded={"md"}
        borderWidth={1}
        borderColor={"gray.200"}
      >
        <Box
          w={"full"}
          h={150}
          bg={"gray.100"}
          rounded={"md"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
        >
          <Image
            // source={{ uri: `${BASE_URL2}/${item.img_url}` }}
            // alt={item.name}
            w={"full"}
            h={"full"}
            resizeMode={"cover"}
            rounded={"lg"}
          />
          <Box
            bg={"white"}
            position="absolute"
            right={1}
            top={1}
            py={1}
            px={2}
            rounded={"full"}
          >
            <Text fontFamily={"Poppins_400Regular"} fontSize={"xs"}>
              ₱ 1520
            </Text>
          </Box>
        </Box>
        <Box py={1} alignItems={"center"}>
          <Text fontFamily={"Poppins_600SemiBold"}>Maize</Text>
        </Box>
      </Box>

      {/* <HStack bg={"white"} p={2} rounded={"lg"} mb={2}>
        <Box
          w={Width/2-25}
          h={70}
          bg={"gray.100"}
          rounded={"lg"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            source={{ uri: `${BASE_URL2}/${item.img_url}` }}
            alt={item.name}
            w={"full"}
            h={'full'}
           resizeMode={'cover'}
           rounded={'lg'}
          />
        </Box>
        <Box flex={1} px={2}>
          <HStack justifyContent={"space-between"}>
            <Text fontFamily={"Poppins_500Medium"} fontSize={"16"}>
              {item.store_name}
            </Text>
            <Text fontFamily={"Poppins_400Regular"}>Location</Text>
          </HStack>
          <Text>
            <FontAwesome5 name={"star"} size={10} />
            <FontAwesome5 name={"star"} size={10} />
            <FontAwesome5 name={"star"} size={10} />
            <FontAwesome5 name={"star"} size={10} />
            <FontAwesome5 name={"star"} size={10} />
          </Text>
        </Box>
      </HStack> */}
    </TouchableOpacity>
  );
};

export default Product;

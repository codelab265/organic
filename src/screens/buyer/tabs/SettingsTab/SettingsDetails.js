import React from "react";
import { Avatar, Box, Button, Divider, HStack, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../../../../shared/theme/Colors";
import { useAuthContext } from "../../../../context/AuthContext";
import { TouchableOpacity } from "react-native";
const SettingsDetails = ({navigation}) => {
  const { userDetails } = useAuthContext();
  return (
    <Box flex={1} px={4}>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <Avatar
          size={"xl"}
          bg={"white"}
          borderWidth={1}
          borderColor={"gray.300"}
        >
          <FontAwesome name="user" size={35} color={Colors.gray} />
        </Avatar>
        <Text fontFamily={"Poppins_600SemiBold"} mt={2}>
          {userDetails.name}
        </Text>
        <Text fontFamily={"Poppins_400Regular"} color={"gray.500"}>
          {userDetails.email}
        </Text>

        <Button rounded={"full"} px={8} bg={Colors.secondary} mt={4}>
          <Text fontFamily={"Poppins_500Medium"}>Logout</Text>
        </Button>
      </Box>
      <Box flex={2} pt={4}>
        <Box p={2} bg={"white"}>
          <Text fontFamily={"Poppins_500Medium"}>CONTENT</Text>
        </Box>
        <Box flex={1}>
          <TouchableOpacity onPress={()=>navigation.navigate('BuyerOrderHistoryScreen')}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack alignItems={"center"} py={2} mt={4}>
                <FontAwesome5 name="wallet" color={"gray"} size={20} />
                <Text ml={3} fontFamily={"Poppins_500Medium"} fontSize={"md"}>
                  Order History
                </Text>
              </HStack>
              <FontAwesome name="chevron-right" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('BuyerProfileDetailsScreen')}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack alignItems={"center"} py={2} mt={4}>
                <FontAwesome name="users" color={"gray"} size={20} />
                <Text ml={4} fontFamily={"Poppins_500Medium"} fontSize={"md"}>
                  Profile
                </Text>
              </HStack>
              <Box>
                <FontAwesome name="chevron-right" />
              </Box>
            </HStack>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsDetails;

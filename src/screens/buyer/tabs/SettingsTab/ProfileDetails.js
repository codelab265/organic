import { View, Text, Box, Avatar, Badge, Button } from "native-base";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../../shared/theme/Colors";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "../../../../context/AuthContext";

const ProfileDetails = ({ navigation }) => {
  const { userDetails } = useAuthContext();

  return (
    <Box flex={1} px={4}>
      <Box justifyContent={"center"} alignItems={"center"} py={"10"}>
        <Avatar size={"2xl"} bg={"white"}>
          <FontAwesome name="user" size={50} color={Colors.primary} />
          <Avatar.Badge
            flex={1}
            justifyContent="center"
            alignItems={"center"}
            bg={Colors.blue}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("buyerEditProfileScreen")}
            >
              <FontAwesome name="edit" size={12} color={"white"} />
            </TouchableOpacity>
          </Avatar.Badge>
        </Avatar>
      </Box>
      <Box
        flex={1}
        bg={"white"}
        rounded={"lg"}
        p={4}
        mb={90}
        borderWidth={1}
        borderColor={"gray.200"}
      >
        <Box>
          <Text fontSize={"md"} fontFamily={"Poppins_600SemiBold"}>
            Full Name
          </Text>
          <Text fontFamily={"Poppins_500Medium"} color={"gray.400"}>
            {userDetails.name}
          </Text>
        </Box>
        <Box mt={4}>
          <Text fontSize={"md"} fontFamily={"Poppins_600SemiBold"}>
            Email
          </Text>
          <Text fontFamily={"Poppins_500Medium"} color={"gray.400"}>
            {userDetails.email}
          </Text>
        </Box>
        <Box mt={4}>
          <Text fontSize={"md"} fontFamily={"Poppins_600SemiBold"}>
            Phone Number
          </Text>
          <Text fontFamily={"Poppins_500Medium"} color={"gray.400"}>
            {userDetails.phone_number}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDetails;

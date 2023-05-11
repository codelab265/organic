import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Box, Divider, HStack, Text, VStack } from "native-base";
import Colors from "../../../shared/theme/Colors";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthContext } from "../../../context/AuthContext";

const ChatListItem = ({ item, onPress }) => {
  const { userDetails } = useAuthContext();
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack flex={1} alignItems={'center'}>
        <Box>
          <Avatar size={"lg"}>
            <FontAwesome name="user" size={24} />
          </Avatar>
        </Box>
        <HStack flex={1} justifyContent={'space-between'}>
        <VStack
          px={2}
          overflow={"hidden"}
          flexWrap={"nowrap"}
          bg
        >
          <Text
            fontFamily={"Poppins_600SemiBold"}
            fontSize={"md"}
            color={Colors.blue}
          >
            {item.buyer.name}
          </Text>
          <Box flexWrap={"nowrap"} flex={1} flexDir={'row'} >
            <Text
              fontFamily={"Poppins_400Regular"}
              color={"gray.500"}
              isTruncated
            >
              {item.last_message.message}
            </Text>
           
          </Box>
        </VStack>
        <VStack alignItems={"flex-end"}>
          <Text fontFamily={"Poppins_400Regular"} color={"gray.500"} mb={1}>
            {moment(item.last_message.updated_at).fromNow()}
          </Text>
          <FontAwesome name="chevron-right" />
        </VStack>
        </HStack>
      </HStack>
      <Divider mt={2} mb={4} mx={4} />
    </TouchableOpacity>
  );
};

export default ChatListItem;

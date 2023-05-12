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
      <HStack justifyContent={"space-evenly"}>
          <Box>
            <Avatar size={"lg"}>
              <FontAwesome name={'user'} size={24}/>
            </Avatar>
          </Box>
          <VStack
            px={2}
            flex={1}
            overflow={"hidden"}
            flexWrap={"nowrap"}
            justifyContent={"center"}
          >
            <Text
              fontFamily={"Poppins_600SemiBold"}
              fontSize={"md"}
              color={Colors.blue}
            >
              {item.buyer.name}
            </Text>
            <Box flexWrap={'nowrap'}>
              <Text
                fontFamily={"Poppins_400Regular"}
                color={"gray.500"}
                isTruncated
              >
                {item.last_message.message}
              </Text>
            </Box>
          </VStack>
          <VStack alignItems={"flex-end"} justifyContent={"center"}>
            <Text fontFamily={"Poppins_400Regular"} color={"gray.500"} mb={1}>
              {moment(item.last_message.updated_at).fromNow()}
            </Text>
            <FontAwesome name='chevron-right'/>
          </VStack>
        </HStack>
        <Divider mt={2} mb={4} mx={4}/>
    </TouchableOpacity>
  );
};

export default ChatListItem;

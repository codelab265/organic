import { Avatar, Badge, Box, Divider, HStack, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../../../shared/theme/Colors";

const ChatList = () => {
  return (
    <Box flex={1} mb={90} p={4}>
      <TouchableOpacity>
        <HStack justifyContent={"space-evenly"}>
          <Box>
            <Avatar size={"lg"}></Avatar>
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
              Mphatso Mlenga
            </Text>
            <Box>
              <Text
                fontFamily={"Poppins_400Regular"}
                color={"gray.500"}
                isTruncated
              >
                lorem dkjfsdjfhsd jksldksd sjhdjskhfjsdhfjdf
              </Text>
            </Box>
          </VStack>
          <VStack alignItems={"flex-end"} justifyContent={"center"}>
            <Text fontFamily={"Poppins_400Regular"} color={"gray.500"}>2 seconds ago</Text>
            <Badge bg={Colors.secondary} rounded={"full"} mt={1}>
              4
            </Badge>
          </VStack>
        </HStack>
        <Divider mt={2} />
      </TouchableOpacity>
    </Box>
  );
};

export default ChatList;

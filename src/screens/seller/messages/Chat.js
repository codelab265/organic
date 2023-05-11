import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

import { Box, HStack, Text, VStack, Avatar, Image, Button } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { userDetails } = useAuthContext();
  const buyer = route.params.buyer;
  const buyerId = buyer.id;
  const sellerId = userDetails.id;
  const buyerName = buyer.name;
 
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get(
      `${BASE_URL}/seller/messages/${buyerId}/${sellerId}`
    );
    console.log(response.data);
    const messages = response.data.map((message) => ({
      _id: message.id,
      text: message.message,
      createdAt: message.created_at,
      user: {
        _id: message.sender_id,
      },
    }));
    setMessages(messages);
  };

  const onSend = async (newMessages) => {
    const response = await axios.post(`${BASE_URL}/seller/messages/create`, {
      sender_id: sellerId,
      receiver_id: buyerId,
      message: newMessages[0].text,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, {
        _id: response.data.id,
        text: response.data.message,
        createdAt: response.data.created_at,
        user: {
          _id: response.data.sender_id,
        },
      })
    );
  };

  return (
    <Box flex={1}>
      <HStack bg={Colors.primary} px={4} py={2} alignItems={"center"}>
        
        <Button rounded={'full'} bg={Colors.primary} _pressed={{ background:Colors.primary }} onPress={()=>navigation.goBack()}>
        <FontAwesome5 name="arrow-left" color={"white"} size={20} />
        </Button>
        
        <HStack alignItems={"center"} ml={4}>
          <Avatar size={"md"}>
            <FontAwesome5 name="user" size={24} />
            </Avatar>
            
          <VStack ml={3}>
            <Text
              fontFamily={"Poppins_500Medium"}
              fontSize={"lg"}
              color={"white"}
            >
              {buyerName}
            </Text>
            <Text
              fontFamily={"Poppins_400Regular"}
              color={"white"}
            >
              {buyerName}
            </Text>
          </VStack>
        </HStack>
      </HStack>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: sellerId,
        }}
      />
    </Box>
  );
};

export default Chat;

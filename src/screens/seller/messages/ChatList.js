import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { Box, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import Colors from "../../../shared/theme/Colors";
import { FontAwesome } from "@expo/vector-icons";
import ChatListItem from "../../components/seller/ChatListItem";
import { useAuthContext } from "../../../context/AuthContext";

const ChatList = ({navigation}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const { userDetails } = useAuthContext();
  const sellerId = userDetails.id;

  useEffect(() => {
    getConversations();
  }, [isFocused]);

  const getConversations = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/seller/conversations/${sellerId}`)
      .then((response) => {
        setLoading(false);
        setConversations(response.data);
        
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Alert.alert("error", "Something went wrong");
      });
  };

  return (
    <Box flex={1} mb={90} p={4}>

      {!loading && conversations.length === 0 ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <FontAwesome name="comment" size={50} color={Colors.primaryDark} />
          <Text fontFamily={"Poppins_400Regular"} mt={4}>
            No conversations yet
          </Text>
        </Box>
      ) : (
        <FlatList
          data={conversations}
          renderItem={({ item }) => <ChatListItem item={item} onPress={()=>navigation.navigate('SellerMessagingScreen', {buyer:item.buyer})} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </Box>
  );
};

export default ChatList;

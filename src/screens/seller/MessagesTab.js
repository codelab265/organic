import { View, Text } from "react-native";
import React from "react";
import Home from "./home/Home";
import { createStackNavigator } from "@react-navigation/stack";

import OrderDetails from "./orders/OrderDetails";
import Colors from "../../shared/theme/Colors";
import ChatList from "./messages/ChatList";

const Stack = createStackNavigator();

const MessagesTab = () => {
  return (
    <Stack.Navigator initialRouteName="SellerChatListScreen">
      <Stack.Screen
        name="SellerChatListScreen"
        component={ChatList}
        options={{
            headerTitle: "Chat List",
            headerTitleAlign:'center',
            headerStyle: { backgroundColor: Colors.primary },
            headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
       {/* <Stack.Screen
        name="SellerOrderDetailsScreen"
        component={OrderDetails}
        options={{
          headerTitle: "Order Details",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      /> */}
      {/*
      <Stack.Screen
        name="BuyerProductDetailsScreen"
        component={ProductDetails}
        options={{
          headerTitle: "Shop Details",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      /> */}
    </Stack.Navigator>
  );
};
export default MessagesTab;

import { View, Text } from "react-native";
import React from "react";
import Home from "./home/Home";
import { createStackNavigator } from "@react-navigation/stack";

import OrderDetails from "./orders/OrderDetails";
import Colors from "../../shared/theme/Colors";
import Orders from "./orders/Orders";

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator initialRouteName="SellerHomeScreen">
      <Stack.Screen
        name="SellerHomeScreen"
        component={Home}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
        
        <Stack.Screen
          name="SellerOrdersScreen"
          component={Orders}
          options={{
            headerTitle: "Available orders",
            headerStyle: { backgroundColor: Colors.primary },
            headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
          }}
        />
       <Stack.Screen
        name="SellerOrderDetailsScreen"
        component={OrderDetails}
        options={{
          headerTitle: "Order Details",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeTab;

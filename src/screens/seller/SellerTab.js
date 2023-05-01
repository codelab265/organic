import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./home/Home";
import Colors from "../../shared/theme/Colors";

const Tab = createBottomTabNavigator();
const BuyerTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          right: 15,
          left: 15,
          elevation: 0.5,
          borderRadius: 10,
          height: 75,
          backgroundColor: "white",
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="home"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text style={{ color: focused ? Colors.primary : Colors.secondaryBlue, fontFamily:'Poppins_400Regular' }}>
                Home
              </Text>
            </View>
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="chat"
        component={Home}
        options={{
            tabBarLabel:'Chat',
            headerShown:false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="comment"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text style={{ color: focused ? Colors.primary : Colors.secondaryBlue, fontFamily:'Poppins_400Regular' }}>
                Messages
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="user"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text style={{ color: focused ? Colors.primary : Colors.secondaryBlue, fontFamily:'Poppins_400Regular', }}>
                Profile
              </Text>
            </View>
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="shop"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="shopping-bag"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text style={{ color: focused ? Colors.primary : Colors.secondaryBlue, fontFamily:'Poppins_400Regular' }}>
                Cart
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BuyerTab;

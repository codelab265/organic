import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./tabs/Home";
import Messages from "./tabs/Messages";
import Colors from "../../shared/theme/Colors";
import Profile from "./tabs/Profile";
import Cart from "./tabs/Cart";
import Settings from "./tabs/Settings";
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
              <Text
                style={{
                  color: focused ? Colors.primary : Colors.secondaryBlue,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Home
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="chat"
        component={Messages}
        options={{
          tabBarLabel: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="comment"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text
                style={{
                  color: focused ? Colors.primary : Colors.secondaryBlue,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Messages
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="shopping-bag"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text
                style={{
                  color: focused ? Colors.primary : Colors.secondaryBlue,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Cart
              </Text>
            </View>
          ),
          headerTitle: "Cart list",
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: Colors.primary },
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="cog"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text
                style={{
                  color: focused ? Colors.primary : Colors.secondaryBlue,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Settings
              </Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BuyerTab;

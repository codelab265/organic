import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Home from "./home/Home";
import Colors from "../../shared/theme/Colors";
import AddProduct from "./home/AddProduct";
import { Box } from "native-base";
import { TouchableOpacity } from "react-native";
import Profile from "./profile/Profile";
import HomeTab from "./HomeTab";
import MessagesTab from "./MessagesTab";

const Tab = createBottomTabNavigator();
const BuyerTab = () => {
  const CustomButton = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        w={60}
        h={60}
        rounded="full"
        bg={Colors.primary}
        borderWidth={4}
        borderColor={"white"}
      >
        {children}
      </Box>
    </TouchableOpacity>
  );
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
        component={HomeTab}
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
        component={MessagesTab}
        options={{
          tabBarLabel: "Chat list",
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
        name="addProduct"
        component={AddProduct}
        options={{
          headerTitle: "Add product",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          tabBarIcon: ({ focused }) => (
            <Box>
              <FontAwesome name="plus-circle" size={20} color={"white"} />
            </Box>
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="user"
                size={18}
                color={focused ? Colors.primary : Colors.secondaryBlue}
              />
              <Text
                style={{
                  color: focused ? Colors.primary : Colors.secondaryBlue,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Profile
              </Text>
            </View>
          ),
          headerShown: false,
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
        }}
      />
    </Tab.Navigator>
  );
};

export default BuyerTab;

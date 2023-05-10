import { useCallback } from "react";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./src/Welcome";
import { NativeBaseProvider, StatusBar } from "native-base";
import BuyerLogin from "./src/screens/buyer/BuyerLogin";
import BuyerRegister from "./src/screens/buyer/BuyerRegister";
import SellerLogin from "./src/screens/seller/SellerLogin";
import SellerRegister from "./src/screens/seller/SellerRegister";
import BuyerTab from "./src/screens/buyer/BuyerTab";
import SellerTab from "./src/screens/seller/SellerTab";
import { AuthProvider } from "./src/context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import api from "./api";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

import BuyerShopDetails from "./src/screens/buyer/BuyerShopDetails";
import Colors from "./src/shared/theme/Colors";
import { Client } from "rollbar-react-native";
import UserType from "./src/UserType";
import { CartContextProvider } from "./src/context/CartContext";
import Chat from "./src/screens/buyer/tabs/MessagesTabs/Chat";
import ShopLocation from "./src/screens/buyer/tabs/HomeTabs/ShopLocation";
const rollbar = new Client("5b429c1de9a441c3b50ecda15998fe26");

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} />
      <AuthProvider>
        <CartContextProvider>
          <NativeBaseProvider>
            <NavigationContainer onReady={onLayoutRootView}>
              <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                  name="Welcome"
                  component={Welcome}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UserTypeScreen"
                  component={UserType}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="BuyerLogin"
                  component={BuyerLogin}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="BuyerRegister"
                  component={BuyerRegister}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="SellerLogin"
                  component={SellerLogin}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SellerRegister"
                  component={SellerRegister}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BuyerTabs"
                  component={BuyerTab}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SellerTabs"
                  component={SellerTab}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BuyerShopLocationScreen"
                  component={ShopLocation}
                  options={{
                    // headerStyle: { backgroundColor: Colors.primary },
                    // headerTitleStyle: { color: "white" },
                    // headerTitle: "Shop Location",
                    // headerTitleAlign: "center",
                    headerShown:false
                  }}
                />
                <Stack.Screen
                  name="MessagingScreen"
                  component={Chat}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

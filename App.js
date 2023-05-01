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
    <StatusBar backgroundColor={Colors.primary}/>
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator initialRouteName="Welcome">
             <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{ headerShown: false }}
            />
            {/**
            <Stack.Screen
              name="buyerLogin"
              component={BuyerLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="buyerRegister"
              component={BuyerRegister}
              options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
              name="buyerTabs"
              component={BuyerTab}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="SellerTabs"
              component={SellerTab}
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
            
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
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

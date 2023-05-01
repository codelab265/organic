import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Colors from "../../../shared/theme/Colors";
import ShopDetail from "./HomeTabs/ShopDetail";
import Shops from "./HomeTabs/Shops";

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName="buyerShopScreen">
      <Stack.Screen
        name="buyerShopScreen"
        component={Shops}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="BuyerShopDetailsScreen"
        component={ShopDetail}
        options={{
          headerTitle: "Shop Details",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
    </Stack.Navigator>
  );
};

export default Home;

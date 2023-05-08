import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Colors from "../../../shared/theme/Colors";
import CartList from "./CartTabs/CartList";
import Checkout from "./CartTabs/Checkout";
import SuccessOrder from "./CartTabs/SuccessOrder";
import ProductDetails from "./HomeTabs/ProductDetails";
import ShopDetail from "./HomeTabs/ShopDetail";

const Stack = createStackNavigator();

const Cart = () => {
  return (
    <Stack.Navigator initialRouteName="BuyerCartScreen">
      <Stack.Screen
        name="BuyerCartScreen"
        component={CartList}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="BuyerCheckoutScreen"
        component={Checkout}
        options={{
          headerTitle: "Checkout",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
      <Stack.Screen
        name="BuyerProductDetailsScreen"
        component={ProductDetails}
        options={{
          headerTitle: "Shop Details",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
      <Stack.Screen
        name="BuyerSuccessOrderScreen"
        component={SuccessOrder}
        options={{
          headerShown:false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Cart;

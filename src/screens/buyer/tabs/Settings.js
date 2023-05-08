import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../../shared/theme/Colors";
import OrderDetails from "./SettingsTab/OrderDetails";
import OrderHistory from "./SettingsTab/OrderHistory";
import ProfileDetails from "./SettingsTab/ProfileDetails";
import SettingsDetails from "./SettingsTab/SettingsDetails";
const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator initialRouteName="BuyerSettingsDetailScreen">
      <Stack.Screen
        name="BuyerSettingsDetailScreen"
        component={SettingsDetails}
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="BuyerProfileDetailsScreen"
        component={ProfileDetails}
        options={{
          headerTitle: "Profile Details",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />

      <Stack.Screen
        name="BuyerOrderHistoryScreen"
        component={OrderHistory}
        options={{
          headerTitle: "Order History",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="BuyerOrderDetailsScreen"
        component={OrderDetails}
        options={{
          headerTitle: "Order Details",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
    </Stack.Navigator>
  );
};

export default Settings;

import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import Colors from "../../../shared/theme/Colors";
import EditProfile from "./ProfileTabs/EditProfile";
import ProfileDetails from "./ProfileTabs/ProfileDetails";

const Stack = createStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="buyerProfileDetailsScreen">
      <Stack.Screen
        name="buyerProfileDetailsScreen"
        component={ProfileDetails}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="buyerEditProfileScreen"
        component={EditProfile}
        options={{
          headerTitle: "Edit profile",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontFamily: "Poppins_500Medium" },
        }}
      />
    </Stack.Navigator>
  );
};

export default Profile;

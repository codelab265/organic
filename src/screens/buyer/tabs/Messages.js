import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../../shared/theme/Colors";
import ChatList from "./MessagesTabs/ChatList";
import EditProfile from "./ProfileTabs/EditProfile";


const Stack = createStackNavigator();

const Messages = () => {
  return (
    <Stack.Navigator initialRouteName="buyerChatListScreen">
      <Stack.Screen
        name="buyerChatListScreen"
        component={ChatList}
        options={{
          headerTitle:"Chat List",
          headerTitleAlign:"center",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle:{ color:"white", fontFamily:"Poppins_600SemiBold" }
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

export default Messages;

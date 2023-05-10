import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../../shared/theme/Colors";
import Chat from "./MessagesTabs/Chat";
import ChatList from "./MessagesTabs/ChatList";
import EditProfile from "./ProfileTabs/EditProfile";


const Stack = createStackNavigator();

const Messages = () => {
  return (
    <Stack.Navigator initialRouteName="buyerChatListScreen">
      <Stack.Screen
        name="BuyerChatListScreen"
        component={ChatList}
        options={{
          headerTitle:"Chat List",
          headerTitleAlign:"center",
          headerStyle: { backgroundColor: Colors.primary },
          headerTitleStyle:{ color:"white", fontFamily:"Poppins_600SemiBold" }
        }}
      />
      <Stack.Screen
        name="BuyerChatScreen"
        component={Chat}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
};

export default Messages;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Box, Button, Text, VStack } from "native-base";
import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Colors from "../../../shared/theme/Colors";

const Profile = ({navigation}) => {
  const { userDetails } = useAuthContext();

  const Logout = async() => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('login')
    navigation.reset({ index: 0, routes: [{ name: "UserTypeScreen" }] })
  }
  return (
    <Box flex={1} bg={Colors.primary}>
      <Box
        bg={Colors.primary}
        w={"full"}
        h={200}
        position={"relative"}
        zIndex={1}
        alignItems={'center'}
      >
        <Avatar
          source={{ uri: `${BASE_URL2}/${userDetails.img_url}` }}
          size={"2xl"}
         
          bottom={-60}
          position={"absolute"}
        />
      </Box>
      <Box flex={1} bg={"gray.100"} roundedTop={"3xl"} >
        <VStack px={4} pt={16}>
        <Box>
            <Text fontSize={'md'} fontFamily={"Poppins_600SemiBold"}>Full Name</Text>
            <Text fontFamily={'Poppins_500Medium'} color={'gray.400'}>
                {userDetails.name}
            </Text>
        </Box>
        <Box mt={4}>
            <Text fontSize={'md'} fontFamily={"Poppins_600SemiBold"}>Email</Text>
            <Text fontFamily={'Poppins_500Medium'} color={'gray.400'}>
                {userDetails.email}
            </Text>
        </Box>
        <Box mt={4}>
            <Text fontSize={'md'} fontFamily={"Poppins_600SemiBold"}>Phone Number</Text>
            <Text fontFamily={'Poppins_500Medium'} color={'gray.400'}>
                {userDetails.phone_number}
            </Text>
        </Box>
        <Box mt={4}>
            <Text fontSize={'md'} fontFamily={"Poppins_600SemiBold"}>Store Name</Text>
            <Text fontFamily={'Poppins_500Medium'} color={'gray.400'}>
                {userDetails.store_name}
            </Text>
        </Box>
        <Box mt={4}>
            <Button rounded={'full'} bg={Colors.primary} onPress={Logout}>
                <Text fontFamily={'Poppins_500Medium'} color={'white'}>Logout</Text>
            </Button>
        </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Profile;

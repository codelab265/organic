import { View } from 'react-native'
import React from 'react'
import { Box, Button, Input, Text } from 'native-base'
import Colors from '../../../../shared/theme/Colors'

const EditProfile = () => {
  return (
    <Box flex={1} p={4} mb={90}>
      <Input placeholder='Full name' fontFamily={"Poppins_500Medium"} bg={'white'} mb={4} rounded={"md"}/>
      <Input placeholder='Email' fontFamily={"Poppins_500Medium"} bg={'white'} mb={4} rounded={"md"}/>
      <Input placeholder='Phone Number' fontFamily={"Poppins_500Medium"} bg={'white'} mb={4} rounded={"md"}/>
      <Input placeholder='Password' fontFamily={"Poppins_500Medium"} bg={'white'} mb={4} rounded={"md"}/>
      <Button bg={Colors.secondary} >
        <Text fontFamily={'Poppins_500Medium'} color={'white'}>
          Update Profile
        </Text>
      </Button>
    </Box>
  )
}

export default EditProfile
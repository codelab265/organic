import { Box, Button, Text } from 'native-base'
import React from 'react'
import {FontAwesome} from "@expo/vector-icons";
import Colors from '../../../../shared/theme/Colors';

const SuccessOrder = () => {
  return (
    <Box flex={1} justifyContent='center' alignItems={'center'}>
        <Text mb={4} fontSize={'md'} fontFamily={'Poppins_500Medium'} color={Colors.primary}>
            success
        </Text>
        <Box w={100} h={100} bg={Colors.primary} rounded={'full'} justifyContent='center' alignItems={'center'}>
            <FontAwesome name='check' size={30} color={'white'}  />
        </Box>
        <Text mt={4} fontSize={'xl'} fontFamily={'Poppins_700Bold'} color={Colors.primary}>
            Thank you!!
        </Text>
        <Text mt={4} fontSize={'lg'} fontFamily={'Poppins_500Medium'}>
            Your order was successful
        </Text>
        <Button rounded={'full'} bg={Colors.secondary} mt={8} px={4}>
            <Text fontFamily={'Poppins_500Medium'}>
                <FontAwesome name='arrow-left'/>
                {" "}
                Return home
            </Text>
        </Button>
    </Box>
  )
}

export default SuccessOrder
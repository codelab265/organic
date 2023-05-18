import React from 'react'
import { Box, Image, Text } from 'native-base'
import pending from "../../assets/img/pending.png"

const SellerPending = () => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'} bg={'white'}>
       
        <Image w={200} h={200} source={pending} alt={'Pending'} resizeMode={'contain'} />
        <Text mt={2} fontFamily={'Poppins_500Medium'}>
            Pending for approval
        </Text>
        
        
    </Box>
  )
}

export default SellerPending
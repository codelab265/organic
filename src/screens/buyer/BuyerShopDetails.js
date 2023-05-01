import { View, Text } from 'react-native'
import React from 'react'
import { Box, HStack, VStack } from 'native-base'

const BuyerShopDetails = () => {
  return (
    <Box flex={1}>
        <Box bg={'white'} p={4}>
            <HStack>
                <Box w={90} h={90} bg={'gray.200'} rounded={'lg'}>

                </Box>
                <Box>
                    <VStack>
                        <Text></Text>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    </Box>
  )
}

export default BuyerShopDetails
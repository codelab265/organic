import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Products from './products/Products';
import Colors from '../../shared/theme/Colors';
import ProductDetails from './products/ProductDetails';

const Stack = createStackNavigator();
const ProductsTab = () => {
  return (
    <Stack.Navigator initialRouteName='SellerProductsScreen'>
        <Stack.Screen name='SellerProductsScreen' component={Products}
        options={{ 
            headerTitle:"Your products",
            headerTitleAlign:"center",
            headerTitleStyle:{color:"white"},
            headerStyle:{backgroundColor:Colors.primary},

         }}
        />
        <Stack.Screen name='SellerProductsDetailScreen' component={ProductDetails}
        options={{ 
            headerTitle:"Product Details",
            headerTitleAlign:"center",
            headerTitleStyle:{color:"white"},
            headerStyle:{backgroundColor:Colors.primary},

         }}
        />
    </Stack.Navigator>

  )
}

export default ProductsTab
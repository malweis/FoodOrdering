import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CardListItems'
import Button from '@/components/Button'

const CartScreen = () => {
    const { items, total, checkout } = useCart()
  return (
    <View style={{padding: 10}}>
      <FlatList data={items} renderItem={({item}) => <CartListItem cartItem={item}/>}  contentContainerStyle={{ gap:10}}/>
    <Text style={{marginTop: 20, fontSize: 20, fontWeight: '500'}}>Total: ${total.toFixed(2)}</Text>
     <Button text="express" onPress={checkout} />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen
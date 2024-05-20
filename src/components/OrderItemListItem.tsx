import { View, Text, Pressable, Image , StyleSheet} from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'

import { Order, OrderItem } from '@/constants/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import Colors from '@/constants/Colors';
import { defaultPizzaImage } from './ProductListItem';

interface ListProps {
    orderItem: OrderItem;
  }


const OrderItemListItem = ({orderItem} : ListProps ) => {

    const segments= useSegments();
    dayjs.extend(relativeTime);
    dayjs.locale('en');


  return (
    
    <Pressable style={styles.container}>
     
            <Image
            source={{ uri: orderItem.products.image || defaultPizzaImage }}
            style={styles.image}
            resizeMode="contain"
            />
      <View style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
           
          <Text style={styles.title}>{orderItem.products.name}</Text>
          <View style={styles.details}>
              <Text style={styles.price}>${orderItem.products.price}</Text>
              <Text style={styles.size}>Size: {orderItem.size}</Text>
          </View>
      </View>
      <View style={{justifyContent: 'center' , alignContent: 'center'}}>
          <Text style={styles.title}>{orderItem.quantity}</Text>
      </View>
    </Pressable>
  
  )
}

export default OrderItemListItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 15,
    justifyContent: 'center', 
    alignContent: 'center',
      flexDirection: 'row',
    },
  
    title: {
      fontSize: 18,
      fontWeight: "600",
      
    },
  
    time: {
      color: 'gray',
    
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold",
      },
      size: {
        color: "black",
        fontWeight: "bold",
      },
      image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
      },
      details:{
        flexDirection: 'row',
        gap: 5,
      }
    })
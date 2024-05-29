import { View, Text, Pressable, Image , StyleSheet} from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Order, Tables } from '@/constants/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

interface ListProps {
    order: Tables<'orders'>;
  }


const OrderListItem = ({order} : ListProps ) => {

    const segments= useSegments();
    dayjs.extend(relativeTime);
    dayjs.locale('en');


  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
    <Pressable style={styles.container}>
     
      <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
      </View>
      <View style={{justifyContent: 'center' , alignContent: 'center'}}>
          <Text style={styles.title}>{order.status}</Text>
      </View>
    </Pressable>
  </Link>
  )
}

export default OrderListItem

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
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
    })
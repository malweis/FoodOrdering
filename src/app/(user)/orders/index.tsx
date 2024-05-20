import { StyleSheet, ScrollView, FlatList} from 'react-native';


import orders from '@assets/data/orders';

import Colors from '@constants/Colors';
import ProductListItem from '@components/ProductListItem';
import OrderListItem from '@/components/OrderListItem';


export default function TabOneScreen() {
  return (
    <FlatList  data={orders} renderItem={ ({item }) => <OrderListItem order={item}/> } numColumns={1} contentContainerStyle={styles.container}  />
  

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tabIconDefault,
    padding: 10,
    gap: 10,
    flex: 1,

    
  },

});

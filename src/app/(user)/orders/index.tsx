import { StyleSheet, FlatList, ActivityIndicator , Text} from 'react-native';




import Colors from '@constants/Colors';

import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';


export default function TabOneScreen() {

  const {data : orders, error, isLoading} =useMyOrderList();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

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

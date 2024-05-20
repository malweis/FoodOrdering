import { StyleSheet, ScrollView, FlatList} from 'react-native';


import products from '@assets/data/products';

import Colors from '@constants/Colors';
import ProductListItem from '@components/ProductListItem';


export default function TabOneScreen() {
  return (
    <FlatList  data={products} renderItem={ ({item }) => <ProductListItem product={item}/> } numColumns={2} contentContainerStyle={styles.container} columnWrapperStyle={{gap: 10}} />
  

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tabIconDefault,
    padding: 10,
    gap: 10,
  },

});

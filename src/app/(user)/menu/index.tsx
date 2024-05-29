import { StyleSheet, ScrollView, FlatList, ActivityIndicator, Text} from 'react-native';




import Colors from '@constants/Colors';
import ProductListItem from '@components/ProductListItem';

import { useProductList } from '@/api/products';


export default function TabOneScreen() {
  const {data : products, error, isLoading} =useProductList();

  if (isLoading) {
    return <ActivityIndicator/>
  }
  if (error) {
    return <Text>Failed to fetch product</Text>
  }


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

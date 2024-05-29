import { StyleSheet, ScrollView, FlatList} from 'react-native';


import products from '@assets/data/products';

import Colors from '@constants/Colors';
import ProductListItem from '@components/ProductListItem';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';


export default function TabOneScreen() {
  useEffect(() => {
    const  fetchProducts = async () => {
     const {data, error} = await supabase.from('products').select('*');
     console.log(data, error)
    }

    fetchProducts();

  }, [])


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

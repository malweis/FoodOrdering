import { StyleSheet, View, Image , Text, ScrollView} from 'react-native';


import products from '@assets/data/products';

import Colors from '@constants/Colors';
import ProductListItem from '@components/ProductListItem';


export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
  
     {products.map((product, index) => (
       <ProductListItem key={index} product={product} />
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
 
   flexDirection: 'column',
   gap: 10,
   padding: 10,
   backgroundColor: Colors.light.tabIconDefault,
  },

});

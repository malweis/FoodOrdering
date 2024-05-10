import { StyleSheet, View, Image , Text} from 'react-native';


import products from '@assets/data/products';

import Colors from '@constants/Colors';
import { Product } from '@constants/types';

export const  defaultPizzaImage = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"

interface ListProps {
  product: Product;
}

 const  ProductListItem = ({ product } : ListProps ) => {
    return (
        <View style={styles.container}>
     <Image
      source={{ uri: product.image || defaultPizzaImage}}
      style={styles.image}
    resizeMode='contain'
     />
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.price}>{product.price}</Text>
    </View>
    );
    
}
export default ProductListItem;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light.background,
      padding: 10,
      borderRadius: 20,
      maxWidth: "50%",
      
    },
    image :{
      width: "100%",
      aspectRatio: 1,
    },
    
    title: {
      fontSize: 18,
      fontWeight:"600",
      marginVertical: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    price : {
      color: Colors.light.tint,
      fontWeight: "bold",
    },
  });
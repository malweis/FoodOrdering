import { StyleSheet, View, Image , Text} from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import products from '@/assets/data/products';

import Colors from '@/src/constants/Colors';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
     <Image
      source={{ uri: products[0].image }}
      style={styles.image}
     />
    <Text style={styles.title}>{products[0].name}</Text>
    <Text style={styles.price}>{products[0].price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
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

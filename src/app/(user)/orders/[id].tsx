import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useCart } from "@/providers/CartProvider";
import OrderListItem from "@/components/OrderListItem";

import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";

const ProductDetailScreen = () => {


  const { id: idString } = useLocalSearchParams();
  if (!idString) return <Text>Product not found</Text>;

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const {data : order , error, isLoading} = useOrderDetails(id);
 
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch product</Text>;
  }
  if (!order) {
    return <Text>Order not found</Text>;
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
    
     <FlatList  data={order.order_items} renderItem={ ({item }) => <OrderItemListItem orderItem={item}/> } numColumns={1} contentContainerStyle={styles.containerItems} ListHeaderComponent={ <OrderListItem order={order} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'blue',
    flex: 1,
    padding: 10,
  },

  containerItems: {
    backgroundColor:'gainsboro',
    flex: 1,
    gap: 10,
   marginTop: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 'auto',
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailScreen;

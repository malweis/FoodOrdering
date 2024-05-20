import { View, Text, Image, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import orders from "@assets/data/orders";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/constants/types";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import OrderItemListItem from "@/components/OrderItemListItem";

const ProductDetailScreen = () => {

  const {onAddItem} = useCart();
  const router =useRouter();

  const { id } = useLocalSearchParams();
  const order = orders.find((p) => p.id.toString() === id);

  if (!order) {
    return <Text>Order not found</Text>;
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
     <OrderListItem order={order} />
     <FlatList  data={order.order_items} renderItem={ ({item }) => <OrderItemListItem orderItem={item}/> } numColumns={1} contentContainerStyle={styles.containerItems}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.light.tabIconDefault,
    flex: 1,
    padding: 10,
  },

  containerItems: {
    backgroundColor:Colors.light.tabIconDefault,
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

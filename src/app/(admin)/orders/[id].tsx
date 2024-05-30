import { View, Text, Image, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import orders from "@assets/data/orders";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { OrderStatusList, PizzaSize } from "@/constants/types";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";

const ProductDetailScreen = () => {

  const { id: idString } = useLocalSearchParams();
  if (!idString) return <Text>Product not found</Text>;

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const {data : order , error, isLoading} = useOrderDetails(id);
  const {mutate: updateOrder} = useUpdateOrder();
 
  
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch product</Text>;
  }
  if (!order) {
    return <Text>Order not found</Text>;
  }

  const updateStatus = (status: string) => {
    updateOrder({id: id, updatedFields: {status}})
  }
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
  
     <FlatList  data={order.order_items} renderItem={ ({item }) => <OrderItemListItem orderItem={item}/> } numColumns={1} contentContainerStyle={styles.containerItems} ListHeaderComponent={   <OrderListItem order={order} />}  ListFooterComponent={<>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => {
          updateStatus(status);

        }}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>
} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'gainsboro',
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

import { StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";

import Colors from "@constants/Colors";

import OrderListItem from "@/components/OrderListItem";
import { useOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function TabOneScreen() {
  const { data: orders, error, isLoading } = useOrderList({ archived: false });

 const queryClient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries({queryKey: ['orders']})
         
        }
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch product</Text>;
  }



  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      numColumns={1}
      contentContainerStyle={styles.container}
    />
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

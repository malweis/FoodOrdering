import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/constants/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from "@/api/products";

const ProductDetailScreen = () => {
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const {onAddItem} = useCart();
  const router =useRouter();
  const [selectedSize, setSelectedSize] = React.useState<PizzaSize>(sizes[0]);
  const { id: idString } = useLocalSearchParams();
  if (!idString) return <Text>Product not found</Text>;

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }
  const addToCart = () => {
    if (!product) return;
    onAddItem(product, selectedSize)
    router.push('/cart')

  }

  return (
    <View style={styles.container}>
      <Stack.Screen
       
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create/?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
     
     <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },

});

export default ProductDetailScreen;

import { CartItem, Tables } from "@/constants/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/orderItems";


type Product = Tables<'products'>;

type CartType = {
  items: CartItem[];
  onAddItem: (product: Tables<'products'>, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total : number;
  checkout : () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
  updateQuantity: () => {},
    total: 0,
      checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {

  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const {mutate: insertOrder } = useInsertOrder();
  const {mutate: insertOrderItems } = useInsertOrderItems();
  const onAddItem = (product: Product, size: CartItem["size"]) => {
    //if already in car increment quantity
    const existingItem = items.find(
        (item) => item.product_id === product.id && item.size === size
        );
    if (existingItem) {
        updateQuantity(existingItem.id, 1);
        return;
        }


    const newCartItem: CartItem = {
      id: randomUUID(), //generated
      product,
      product_id: product.id,

      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
    console.log(items);
    //updateQuantity
  };
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map((item) =>
      item.id != itemId
        ? item
        : {
            ...item,
            quantity: item.quantity + amount,
          }
    ).filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce((sum , item ) => sum + item.product.price * item.quantity, 0);

  const clearItems = () => {
    setItems([]);
  }

  const checkout = () => {
    insertOrder({total}, {onSuccess: saveOrderItems});
  }

  const saveOrderItems = (data : Tables<'orders'>) => {
    const orderItems = items.map((item) => ({
      product_id: item.product_id,
      order_id: data.id,
      size: item.size,
      quantity: item.quantity,
    }));
    
    insertOrderItems(orderItems, {onSuccess: () => {
      clearItems()
      router.push(`/(user)/orders/${data.id}`)
    }})
  
  }


  return (
    <CartContext.Provider value={{ items, onAddItem, updateQuantity, total , checkout}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};

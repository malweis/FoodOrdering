import { CartItem, Tables } from "@/constants/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type Product = Tables<'products'>;

type CartType = {
  items: CartItem[];
  onAddItem: (product: Tables<'products'>, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total : number;
};

export const CartContext = createContext<CartType>({
  items: [],
  onAddItem: () => {},
  updateQuantity: () => {},
    total: 0
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
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
  return (
    <CartContext.Provider value={{ items, onAddItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};

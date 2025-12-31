import { create } from "zustand";
import { SHOP_ITEMS } from "../data/ShopItems";

interface ShopItem {
  itemId: number;
  count: number;
}

export interface ShopState {
  cartItems: ShopItem[];
  priceTotal: number;
  addItem: (itemId: number) => void;
  removeItem: (uuid: string) => void;
}

export const shopStore = create<ShopState>((set) => {
  return {
    cartItems: [],
    priceTotal: 1000,
    addItem: (itemId: number): void =>
      set((state) => {
        const newState = {
          cartItems: [...state.cartItems],
          priceTotal: state.priceTotal,
        };

        const itemIndex = newState.cartItems.findIndex(
          (item) => item.itemId === itemId
        );

        if (itemIndex !== -1) {
          newState.cartItems[itemIndex].count++;
        } else {
          newState.cartItems.push({ itemId: itemId, count: 0 });
        }

        newState.priceTotal =
          Math.round(
            (state.priceTotal -
              (SHOP_ITEMS.find((item) => item.id === itemId)?.price ?? 0)) *
              100
          ) / 100;

        return newState;
      }),
    removeItem: (itemId: string): void => {
      set((state) => {
        return state; //TODO: add remove item function
      });
    },
  };
});

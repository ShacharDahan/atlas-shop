import { create } from "zustand";
import { SHOP_ITEMS } from "../data/ShopItems";
import { START_MONEY } from "../App.constants";
import { devtools } from "zustand/middleware";

export interface ShopItem {
  itemId: number;
  count: number;
  price: number;
  name: string;
}

export interface ShopState {
  cartItems: ShopItem[];
  money: number;
  addItem: (itemId: number) => void;
  removeItem: (itemId: number) => void;
  subtractMoney: (amount: number) => void;
}

export const shopStore = create<ShopState>()(
  devtools((set) => {
    return {
      cartItems: [],
      money: START_MONEY,
      addItem: (itemId: number): void =>
        set(
          (state) => {
            const newState = { ...state };

            const item = SHOP_ITEMS.find((item) => item.id === itemId);

            const itemIndex = newState.cartItems.findIndex(
              (cartItem) => cartItem.itemId === itemId,
            );

            if (item !== undefined) {
              if (itemIndex !== -1) {
                newState.cartItems[itemIndex].count++;
              } else {
                newState.cartItems.push({
                  itemId: itemId,
                  count: 1,
                  price: item.price,
                  name: item.name,
                });
              }
            }

            return newState;
          },
          false,
          "add item",
        ),
      removeItem: (itemId: number): void => {
        set(
          (state) => {
            const newState = { ...state };

            const itemIndex = newState.cartItems.findIndex(
              (item) => itemId === item.itemId,
            );

            if (itemIndex !== -1) {
              if (newState.cartItems[itemIndex].count > 1) {
                newState.cartItems = newState.cartItems.map((item) =>
                  item.itemId === itemId
                    ? { ...item, count: item.count - 1 }
                    : item,
                );
              } else {
                newState.cartItems = newState.cartItems.filter(
                  (item) => item.itemId !== itemId,
                );
              }
            }

            return newState;
          },
          false,
          "remove item",
        );
      },

      subtractMoney(amount: number) {
        set(
          (state) => {
            const newState = { ...state };

            newState.money = newState.money - amount

            newState.money = Math.round(newState.money * 100) / 100;

            return newState;
          },
          false,
          "subtract money",
        );
      },
    };
  }),
);

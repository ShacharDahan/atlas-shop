import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface StoreItem {
  uuid: string;
  itemId: string;
}

interface StoreState {
  cartItems: StoreItem[];
  addItem: (itemId: string) => void;
  removeItem: (uuid: string) => void;
}

const useStore = create<StoreState>((set) => ({
  cartItems: [],
  addItem: (itemId: string): void =>
    set((state) => ({
      cartItems: [...state.cartItems, { uuid: uuidv4(), itemId }],
    })),
  removeItem: (uuid: string): void => {
    set((state) => ({
      cartItems: [
        ...state.cartItems.filter((item) => {
          item.uuid !== uuid;
        }),
      ],
    }));
  },
}));

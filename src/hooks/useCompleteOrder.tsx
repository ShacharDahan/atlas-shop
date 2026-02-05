import { useState } from "react";
import { useStore } from "zustand";
import { shopStore } from "../store/store";

export const useCompleteOrder = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const items = useStore(shopStore, (state) => state.cartItems);
  const removeItem = useStore(shopStore, (state) => state.removeItem);
  const subtractMoney = useStore(shopStore, (state) => state.subtractMoney);

  const itemCount = items.reduce((sum, item) => sum + item.count, 0);

  const loadingItemValue = 100 / itemCount;

  const run = async () => {
    setIsLoading(true);
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      for (let jndex = 0; jndex < item.count; jndex++) {
        removeItem(item.itemId);
        subtractMoney(item.price);
        setLoadingProgress(
          (prevLoadingProgress) => prevLoadingProgress + loadingItemValue,
        );
        await new Promise((r) => setTimeout(r, 750));
      }
    }
    setIsLoading(false);
  };

  return { run, loadingProgress, isLoading };
};

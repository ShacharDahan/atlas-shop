import { useState } from "react";
import { useShopStore } from "../store/store";

export const useCompleteOrder = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems } = useShopStore();
  const { removeItem } = useShopStore();
  const { subtractMoney } = useShopStore();

  const itemCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const loadingItemValue = 100 / itemCount;

  const runCompleteOrder = async () => {
    setIsLoading(true);
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      for (let j = 0; j < item.count; j++) {
        removeItem(item.itemId);
        subtractMoney(item.price);
        setLoadingProgress(
          (prevLoadingProgress) => prevLoadingProgress + loadingItemValue,
        );
        await new Promise((resolve) => setTimeout(resolve, 750));
      }
    }
    setIsLoading(false);
  };

  return { runCompleteOrder, loadingProgress, isLoading };
};

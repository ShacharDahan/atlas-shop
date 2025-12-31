import { AppBar, Typography } from "@mui/material";
import { shopStore } from "../store/store";
import { useStore } from "zustand";
import { ShoppingCart } from "@mui/icons-material";

const ShopBar = () => {
  const priceTotal = useStore(shopStore, (state) => state.priceTotal);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Typography variant="h6" sx={{padding: "1.5rem"}}>{`סכום כולל: ${priceTotal}₪`}</Typography>
      <ShoppingCart sx={{color: "#0B3660", padding: "1.25rem"}}/>
    </AppBar>
  );
};

export default ShopBar;

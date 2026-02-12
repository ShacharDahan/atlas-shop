import { AppBar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useShopStore } from "../store/store";

const ShopBar = () => {
  const { money } = useShopStore();

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
      <Typography
        variant="h6"
        sx={{ padding: "1.5rem" }}
      >{`סכום כולל: ${money}₪`}</Typography>
      <ShoppingCart sx={{ color: "#0B3660", padding: "1.25rem" }} />
    </AppBar>
  );
};

export default ShopBar;

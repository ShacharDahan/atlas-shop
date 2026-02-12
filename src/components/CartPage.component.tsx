import {
  Alert,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Delete } from "@mui/icons-material";
import { SHOP_ITEMS } from "../data/ShopItems";
import { useState } from "react";
import { useCompleteOrder } from "../hooks/useCompleteOrder";
import { ProgressOverlay } from "./ProgressOverlay.component";
import { useShopStore } from "../store/store";

export const CartPage = () => {
  const { cartItems } = useShopStore();
  const { money } = useShopStore();
  const { removeItem } = useShopStore();
  const { runCompleteOrder, loadingProgress, isLoading } = useCompleteOrder();

  const [open, setOpen] = useState(false);

  const totalPrice: number =
    Math.round(
      cartItems.reduce((sum, item) => sum + item.price * item.count, 0) * 100,
    ) / 100;

  const handleOrderClick = async () => {
    if (totalPrice > money) {
      setOpen(true);
    } else {
      await runCompleteOrder();
    }
  };

  return (
    <Box>
      {isLoading && <ProgressOverlay value={loadingProgress} />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2}
      >
        <Alert severity="error" variant="filled" icon={false}>
          ההזמנה לא הושלמה
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        onClick={handleOrderClick}
      >{`הזמן ₪${totalPrice}`}</Button>
      <List>
        {cartItems.map((item) => {
          const itemImage = SHOP_ITEMS.find(
            (sItem) => sItem.id === item.itemId,
          )?.image;
          return Array.from({ length: item.count }).map(() => (
            <ListItem
              key={uuidv4()}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "98vw",
              }}
            >
              <Box
                sx={{
                  width: "4rem",
                  height: "4rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gridTemplateRows: "1fr 1fr",
                }}
              >
                <Box
                  component="img"
                  src={itemImage}
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: 50,
                    gridColumn: 1,
                    gridRow: "1 / span 2",
                    padding: "0.5rem",
                  }}
                />
                <ListItemText
                  sx={{
                    flexGrow: 0,
                    gridColumn: 2,
                    gridRow: 1,
                    textAlign: "right",
                  }}
                >
                  {item.name}
                </ListItemText>
                <Typography
                  sx={{ flexGrow: 0, gridColumn: 2, gridRow: 2 }}
                  color="gray"
                >
                  {`${item.price}₪`}
                </Typography>
              </Box>
              <ListItemButton
                sx={{ flexGrow: 0, padding: "1rem" }}
                onClick={() => removeItem(item.itemId)}
              >
                <Delete color="error" />
              </ListItemButton>
            </ListItem>
          ));
        })}
      </List>
    </Box>
  );
};

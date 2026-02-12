import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { SHOP_ITEMS } from "../data/ShopItems";
import { v4 as uuidv4 } from "uuid";
import { useShopStore } from "../store/store";
import { Info, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import type { ItemData } from "../data/ItemData.interface";
import { InfoDialog } from "./InfoDialog.component";

export const CardGrid = () => {
  const { addItem } = useShopStore();

  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);

  const handleCloseInfoDialog = () => {
    setInfoDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100vw",
      }}
    >
      {SHOP_ITEMS.map((item) => (
        <Card
          sx={{ width: "20rem", margin: "0.5rem", height: "22rem" }}
          key={uuidv4()}
        >
          <CardMedia sx={{ height: "10rem" }} image={item.image} />
          <CardContent>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography component="div" color="gray">
              {`${item.price}₪`}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "space-between",
              paddingTop: "3rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<ShoppingCart />}
              size="small"
              sx={{ width: "9rem", height: "2rem", textWrap: "nowrap" }}
              onClick={() => addItem(item.id)}
            >
              <Typography sx={{ paddingLeft: "0.2rem" }} component="div">
                הוספה לסל
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Info />}
              size="small"
              sx={{
                width: "7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedItem(item);
                setInfoDialogOpen(true);
              }}
            >
              <Typography sx={{ paddingLeft: "0.2rem" }} component="div">
                פרטים
              </Typography>
            </Button>
          </CardActions>
        </Card>
      ))}

      {selectedItem && (
        <InfoDialog
          handleCloseInfoDialog={handleCloseInfoDialog}
          selectedItem={selectedItem}
          infoDialogOpen={infoDialogOpen}
          handleAddToCart={(itemId: number) => {
            addItem(itemId);
          }}
        />
      )}
    </Box>
  );
};

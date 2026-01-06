import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { SHOP_ITEMS } from "../data/ShopItems";
import type { ItemData } from "../data/ItemData.interface";

interface InfoDialogProps {
  selectedItem: ItemData;
  handleAddToCart: Function;
  handleCloseInfoDialog: Function;
  infoDialogOpen: boolean;
}

export const InfoDialog = ({
  selectedItem,
  handleAddToCart,
  handleCloseInfoDialog,
  infoDialogOpen,
}: InfoDialogProps) => {
  return (
    <Dialog onClose={() => handleCloseInfoDialog()} open={infoDialogOpen}>
      <DialogTitle>{selectedItem?.name}</DialogTitle>
      <DialogContentText sx={{paddingRight: "1rem", paddingLeft: "1rem"}}>{selectedItem?.description}</DialogContentText>
      <DialogContent>
        <Box
          component="img"
          src={
            SHOP_ITEMS.find((listItem) => listItem.id === selectedItem?.id)
              ?.image
          }
          sx={{
            width: "100%",
            height: 240,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          sx={{ width: "9rem", height: "2rem", textWrap: "nowrap" }}
          onClick={() => handleAddToCart(selectedItem?.id)} //TODO: error no money pop up
        >
          הוספה לסל
        </Button>
        <Button onClick={() => handleCloseInfoDialog()} color="primary">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

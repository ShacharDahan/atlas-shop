import { Tab, Tabs } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useState, type SyntheticEvent } from "react";

const ShopTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab icon={<HomeIcon />} />
      <Tab icon={<ShoppingCartIcon />} />
    </Tabs>
  );
};

export default ShopTabs;

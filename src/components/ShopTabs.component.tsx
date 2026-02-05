import { Box, Tab, Tabs } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useState, type SyntheticEvent } from "react";
import { CardGrid } from "./CardGrid.component";
import { CartPage } from "./CartPage.component";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

const ShopTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab icon={<HomeIcon />} />
        <Tab icon={<ShoppingCartIcon />} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <CardGrid />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CartPage />
      </CustomTabPanel>
    </Box>
  );
};

export default ShopTabs;

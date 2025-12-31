import { Box } from "@mui/material";
import "./App.css";
import ShopTabs from "./components/ShopTabs.component";
import ShopBar from "./components/ShopBar.component";

function App() {
  return (
    <Box>
      <ShopBar />
      <ShopTabs />
    </Box>
  );
}

export default App;

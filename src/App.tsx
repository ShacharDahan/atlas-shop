import { Box } from "@mui/material";
import "./App.css";
import ShopTabs from "./components/ShopTabs.component";
import ShopBar from "./components/ShopBar.component";

function App() {
  return (
    <Box>
      <ShopBar />
      <Box sx={{marginTop: "3rem"}}>
        <ShopTabs />
      </Box>
    </Box>
  );
}

export default App;

import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import Navbar from "./Components/AppNavbar";
import About from "./Components/Pages/About";
import DataHandling from "./Components/Pages/DataHandling";
import Index from "./Components/Pages/Index";

import { useSnapshot } from "valtio";
import { vars } from "./hooks/vars";

export default function App() {
  const componentVars = useSnapshot(vars);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            width: "380px",
            height: "430px",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100%",
          backgroundImage: `url(${componentVars.theme ? "darkBg.webp" : "lightBg.webp"})`,
          backgroundSize: "cover",
        }}
      >
        <Navbar />

        {componentVars.page === "Main" && <Index />}
        {componentVars.page === "Data Handling" && <DataHandling />}
        {componentVars.page === "About" && <About />}
      </Box>
    </>
  );
}

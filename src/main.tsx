import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import getTheme from "./hooks/geters/theme.ts";
import { Box, ThemeProvider } from "@mui/material";

const root = createRoot(document.getElementById("root")!);

export const render = () =>
  root.render(
    <StrictMode>
      <Box sx={{ width: "380px", height: "430px" }}>
        <ThemeProvider theme={getTheme()}>
          <App />
        </ThemeProvider>
      </Box>
    </StrictMode>,
  );

render();

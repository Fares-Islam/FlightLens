import { createTheme } from "@mui/material/styles";
import { getComponentColorOverrides } from "./componentColorOverrides.ts";
import { vars } from "../vars.ts";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    menuBg: Palette["primary"];
    unFocusedText: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    menuBg?: PaletteOptions["primary"];
    unFocusedText?: PaletteOptions["primary"];
  }
}

export const getColors = () => ({
  primary: vars.theme ? "#1a1a2e" : "#ffffff",
  secondary: vars.theme ? "#0ea5e9" : "#bad4ff",
  tertiary: vars.theme ? "#8b5cf6" : "#e4d9ff",
  text: vars.theme ? "#d9cbff" : "#393353",
  error: "#ff0000",
  divider: vars.theme ? "#4a4a6e" : "#8fb6e9",
  menuBg: vars.theme ? "#223452" : "#ffffff",
  unFocusedText: vars.theme ? "#cfc4f6" : "#4b5769",
});

export default function getTheme() {
  vars.colors = getColors();

  return createTheme({
    palette: {
      primary: { main: vars.colors.primary },
      secondary: { main: vars.colors.secondary },
      tertiary: { main: vars.colors.tertiary },
      text: { primary: vars.colors.text },
      error: { main: vars.colors.error },
      divider: vars.colors.divider,
      menuBg: { main: vars.colors.menuBg },
      unFocusedText: { main: vars.colors.unFocusedText },
    },
    components: getComponentColorOverrides(),
  });
}

import type { Components, Theme } from "@mui/material/styles";
import { vars } from "../vars";

export const getComponentColorOverrides = (): Components<Omit<Theme, "components">> => ({
  MuiTextField: {
    styleOverrides: {
      root: {
        marginTop: "8px",
        marginBottom: "8px",
        
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: vars.colors.text,
        "&.Mui-focused": {
          color: vars.colors.secondary,
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        color: vars.colors.error,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: vars.colors.primary,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: vars.colors.secondary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: vars.colors.secondary,
        },
      },
      notchedOutline: {
        borderColor: vars.colors.divider,
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      thumb: {
        color: vars.colors.secondary,
      },
      switchBase: {
        "&.Mui-checked + .MuiSwitch-track": {
          backgroundColor: vars.colors.tertiary,
        },
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: vars.colors.menuBg,
        color: vars.colors.unFocusedText,
      },
      root: {
        pointerEvents: "none",
        "& .MuiPaper-root": {
          pointerEvents: "auto",
          backgroundColor: vars.colors.menuBg,
          color: vars.colors.unFocusedText,
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: vars.colors.menuBg,
        color: vars.colors.text,
        borderRadius: "16px",
        border: `1px solid ${vars.colors.divider}`,
      },
    },
  },
});

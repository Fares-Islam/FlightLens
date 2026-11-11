import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/settings";
import React from "react";
import { vars } from "../../hooks/vars";

interface NavbarProps {
  page: string;
  setPage: (page: string) => void;
}

const navItems = ["Main", "Data Handling", "About"];

export default function Navbar({ page, setPage }: NavbarProps) {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorElement);

  const handleDropdownClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorElement(null);
  };

  return (
    <AppBar sx={{ backgroundColor: vars.colors.primary }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        {navItems.map((item) => (
          <Button
            key={item}
            onClick={() => setPage(item)}
            sx={{
              background: `linear-gradient(to right, ${vars.colors.secondary} 0%, ${vars.colors.gradientSecondColor} 50%)`,
              color: vars.colors.text,
              textTransform: "none",
              mx: 1,
              fontWeight: "bold",
              borderRadius: "24px",
              fontSize: "12px",
              px: 2,
              opacity: page === item ? 1 : 0.7,
              transition: "all 0.3s ease",

              "&:hover": {
                opacity: 1,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(14, 165, 233, 0.4)",
              },
            }}
          >
            {item}
          </Button>
        ))}
        <IconButton onClick={handleDropdownClick}>
          <SettingsIcon
            sx={{
              color: "#3d6dac",
              fontSize: 32,
            }}
          />
        </IconButton>
        <Menu anchorEl={anchorElement} open={isOpen} onClose={handleDropdownClose}>
          <MenuItem onClick={handleDropdownClose}>temp</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

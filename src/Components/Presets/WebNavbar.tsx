import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import QuestionMark from "@mui/icons-material/QuestionMark";
import { vars } from "../../hooks/vars";

interface NavbarProps {
  page: string;
  setPage: (page: string) => void;
}

const navItems = ["Main", "About"];

export default function Navbar({ page, setPage }: NavbarProps) {
  return (
    <Box>
      <AppBar sx={{ backgroundColor: vars.colors.primary }}>
        <Toolbar>
          <IconButton onClick={() => setPage("Main")}>
            <QuestionMark sx={{ color: vars.colors.secondary, fontSize: 40 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          {navItems.map((item) => (
            <Button
              key={item}
              onClick={() => setPage(item)}
              sx={{
                background: `linear-gradient(to right, ${vars.colors.secondary} 0%, ${vars.colors.gradientSecondColor} 50%)`,
                color: vars.colors.text,
                textTransform: "none",
                margin: "8px",
                fontWeight: "bold",
                fontSize: "12px",
                borderRadius: "24px",
                px: 3,
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

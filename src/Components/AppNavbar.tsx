import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Toolbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/settings";
import { useRef } from "react";
import handleClickAway from "../hooks/handlers/clickAway";
import handleButtonPopup from "../hooks/handlers/buttonPopup";
import sendMail from "../hooks/apiUsers/sendMail";
import { handleLocalData } from "../hooks/handlers/localData";
import { useSnapshot } from "valtio";
import { vars } from "../hooks/vars";

const navbarItems = ["Main", "Data Handling", "About"];

export default function Navbar() {
  const componentVars = useSnapshot(vars);

  const settingsButton = useRef<HTMLButtonElement>(null);
  const settingsMenu = useRef<HTMLDivElement>(null);

  handleClickAway(settingsButton, settingsMenu);
  handleLocalData({
    theme: String(componentVars.theme),
    autoPopup: String(componentVars.autoPopup),
  });

  return (
    <AppBar sx={{ backgroundColor: vars.colors.primary }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        {navbarItems.map((navbarItem) => (
          <Button
            key={navbarItem}
            onClick={() => (vars.page = navbarItem)}
            sx={{
              background: `linear-gradient(to right, ${vars.colors.secondary} 0%, ${vars.colors.tertiary} 50%)`,
              color: vars.colors.text,
              textTransform: "none",
              mx: 1,
              fontWeight: "bold",
              borderRadius: "24px",
              fontSize: "12px",
              px: 2,
              opacity: componentVars.page === navbarItem ? 1 : 0.7,
              transition: "all 0.3s ease",

              "&:hover": {
                opacity: 1,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(14, 165, 233, 0.4)",
              },
            }}
          >
            {navbarItem}
          </Button>
        ))}
        <IconButton
          onClick={() => handleButtonPopup("isDropdownOpen")}
          id="settingsButton"
          ref={settingsButton}

          sx={{
            color: vars.colors.secondary,
            borderRadius: "50%",
            p: "4px",
            opacity: componentVars.isDropdownOpen ? 1 : 0.7,
            transform: componentVars.isDropdownOpen ? "translateY(-2px)" : "none",
            transition: "all 0.3s ease",

            "&:hover": {
              opacity: 1,
              transform: "translateY(-2px)",
              boxShadow: "0 6px 15px rgba(14, 165, 233, 0.4)",
            },
          }}
        >
          <SettingsIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <Menu
          anchorEl={settingsButton.current}
          open={componentVars.isDropdownOpen}
          ref={settingsMenu}
        >
          <MenuItem disableRipple sx={{ ":hover": { background: "none" }, cursor: "default" }}>
            Auto Popup
            <Switch
              checked={componentVars.autoPopup}
              onChange={(event) => (vars.autoPopup = event.target.checked)}
            />
          </MenuItem>
          <MenuItem disableRipple sx={{ ":hover": { background: "none" }, cursor: "default" }}>
            Theme
            <Switch
              checked={componentVars.theme}
              onChange={(event) => (vars.theme = event.target.checked)}
            />
          </MenuItem>
          <MenuItem onClick={() => handleButtonPopup("isFeedbackPopupOpen", "isDropdownOpen")}>
            Give Feedback
          </MenuItem>
        </Menu>
      </Toolbar>
      <Dialog
        open={componentVars.isFeedbackPopupOpen}
        onClose={() => (vars.isFeedbackPopupOpen = false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ color: vars.colors.text }}>Submit Feedback</DialogTitle>
        <DialogContent>
          <TextField
            label="Describe your feature request or issue"
            type="text"
            maxRows={6}
            slotProps={{ htmlInput: { maxLength: 500 } }}
            fullWidth
            multiline
            variant="outlined"
            value={componentVars.feedbackText}
            onChange={(event) => (vars.feedbackText = event.target.value)}
            helperText={componentVars.feedbackHelperText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleButtonPopup("isFeedbackPopupOpen")}
            sx={{ color: vars.colors.text }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => await sendMail()}
            variant="contained"
            disabled={componentVars.isSubmittingFeedback}
            sx={{ backgroundColor: vars.colors.secondary }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

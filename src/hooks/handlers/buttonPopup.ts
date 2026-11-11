import { vars } from "../vars";

export default function handleButtonPopup(
  isMenuOpen: string,
  isMenuToCloseOpen: string | null = null,
) {
  if (isMenuToCloseOpen != null) vars[isMenuToCloseOpen] = false;
  vars[isMenuOpen] = !vars[isMenuOpen];
}

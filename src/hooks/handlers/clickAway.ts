// Handling clickaway in here so that the clickaway event executes first
import { useEffect } from "react";
import { vars } from "../vars";
import { useSnapshot } from "valtio";

export default function handleClickAway(
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  menuRef: React.RefObject<HTMLDivElement | null>,
) {
  const componentVars = useSnapshot(vars);
  useEffect(() => {
    function main(event: MouseEvent) {
      if (!componentVars.isDropdownOpen) return;

      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        vars.isDropdownOpen = false;
      }
    }
    const handleClickAwayEvent = (event: MouseEvent) => main(event);

    document.addEventListener("mousedown", handleClickAwayEvent, true);
    return () => document.removeEventListener("mousedown", handleClickAwayEvent, true);
  }, [componentVars.isDropdownOpen]);
}

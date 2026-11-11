import { proxy } from "valtio";
import { subscribeKey } from "valtio/utils";
import { render } from "../main";

export const vars = proxy<Record<string, any>>({
  theme: (localStorage.getItem("theme") ?? "true") === "true",
  autoPopup: (localStorage.getItem("autoPopup") ?? "true") === "true",
  page: "Main",
});

subscribeKey(vars, "theme", () => render());

if (chrome.storage) {
  const syncAutoPopup = () => chrome.storage.local.set({ autoPopup: vars.autoPopup });
  await syncAutoPopup();

  subscribeKey(vars, "autoPopup", syncAutoPopup);
}

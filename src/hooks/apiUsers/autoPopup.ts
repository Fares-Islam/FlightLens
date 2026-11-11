export function autoPopupContent() {
  let prevurl = "";

  navigation.addEventListener("navigatesuccess", async () => {
    const url = window.location.href;
    const { autoPopup } = await chrome.storage.local.get("autoPopup");

    if (prevurl == url || !url.includes("/flights/booking") || !autoPopup) return;

    prevurl = url;
    void chrome.runtime.sendMessage("OPEN_NATIVE_POPUP");
  });
}

export function autoPopupService() {
  chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg != "OPEN_NATIVE_POPUP" || !sender.tab?.windowId) return;

    chrome.action.openPopup({ windowId: sender.tab.windowId }).catch(console.error);
  });
}

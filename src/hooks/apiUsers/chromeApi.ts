import { autoPopupContent, autoPopupService } from "./autoPopup";

if (typeof document !== "undefined") {
  // Content script Environment

  autoPopupContent();
} else {
  // Service Worker Environment

  autoPopupService();
}

import emailjs from "@emailjs/browser";
import { vars } from "../vars";

export default async function sendMail() {
  if (!(vars.feedbackText ?? "").trim()) {
    vars.feedbackHelperText = "Feedback cannot be empty.";
    return;
  }

  vars.isSubmittingFeedback = true;

  try {
    await emailjs.send(
      "SendFeedback",
      "template_fk2y4cc",
      { message: vars.feedbackText },
      "wtE1f0cbWCgywa5DA",
    );

    vars.feedbackText = "";
    vars.isSubmittingFeedback = false;
    vars.isFeedbackPopupOpen = false;
  } catch (error) {
    console.error("Error submitting feedback:", error);

    vars.isSubmittingFeedback = false;
    vars.feedbackHelperText = "An error occurred, please try again later.";
  }
}

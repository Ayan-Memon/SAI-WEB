import { BrevoClient } from "@getbrevo/brevo";
import { BREVO_API_KEY } from "../../config/config.js";

const brevo = new BrevoClient({
  apiKey: BREVO_API_KEY,
});

const sendEmail = async (to, subject, text = "", html) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: html,
      textContent: text,
      sender: {
        name: "Sir Adamjee Institute",
        email: "ayangaming0454@gmail.com",
      },
      to: [{ email: to }],
    });

    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;

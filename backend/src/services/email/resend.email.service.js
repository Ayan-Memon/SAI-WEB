import { Resend } from "resend";
import { RESEND_API_KEY } from "../../config/config.js";

// resend api key
const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (email, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "SAI <onboarding@resend.dev>",
      to: email,
      subject: subject,
      html: html,
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

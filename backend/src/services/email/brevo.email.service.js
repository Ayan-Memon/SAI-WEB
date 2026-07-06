import * as brevo from '@getbrevo/brevo';
import { BREVO_API_KEY } from '../../config/config.js';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const email = new brevo.SendSmtpEmail();
    email.sender = { email: "ayangaming0454@gmail.com", name: "Sir Adamjee Institute" };
    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = html;

    const result = await apiInstance.sendTransacEmail(email);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
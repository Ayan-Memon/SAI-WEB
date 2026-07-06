const forgetPasswordTemplate = (resetPasswordLink) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
</head>

<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0"
          style="
            max-width:620px;
            background:#ffffff;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 10px 35px rgba(0,0,0,0.08);
          ">

          <!-- Header -->
          <tr>
            <td style="background:#2f2b2c; padding:35px 30px;">

              <table width="100%">
                <tr>

                  <!-- Logo Circle -->
                  <td width="90" valign="middle">
                    <div style="
                      width:72px;
                      height:72px;
                      border-radius:50%;
                      background:#f7941d;
                      text-align:center;
                      line-height:72px;
                      font-size:30px;
                      color:#fff;
                      font-weight:bold;
                    ">
                      SA
                    </div>
                  </td>

                  <!-- Brand -->
                  <td valign="middle">
                    <h1 style="
                      margin:0;
                      color:#ffffff;
                      font-size:34px;
                      line-height:1;
                      font-weight:900;
                      letter-spacing:1px;
                    ">
                      SIR ADAMJEE
                    </h1>

                    <p style="
                      margin:6px 0 0;
                      color:#d1d5db;
                      font-size:16px;
                      font-weight:bold;
                    ">
                      INTERMEDIATE COLLEGE
                    </p>

                    <div style="
                      display:inline-block;
                      margin-top:10px;
                      background:#f7941d;
                      color:#fff;
                      font-size:12px;
                      padding:6px 14px;
                      border-radius:50px;
                      font-weight:bold;
                      letter-spacing:0.5px;
                    ">
                      SECURE ACCOUNT RECOVERY
                    </div>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:45px 35px;">

              <h2 style="
                margin-top:0;
                color:#1f2937;
                font-size:28px;
              ">
                Reset Your Password
              </h2>

              <p style="
                color:#4b5563;
                font-size:16px;
                line-height:1.8;
                margin-top:18px;
              ">
                We received a request to reset the password for your
                <strong>Sir Adamjee Intermediate College</strong> account.
                Click the button below to create a new password securely.
              </p>

              <!-- Reset Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0;">
                <tr>
                  <td align="center">

                    <a href="${resetPasswordLink}"
                      style="
                        background:#f7941d;
                        color:#ffffff;
                        text-decoration:none;
                        padding:16px 38px;
                        border-radius:12px;
                        display:inline-block;
                        font-size:16px;
                        font-weight:bold;
                        box-shadow:0 5px 15px rgba(247,148,29,0.3);
                      ">
                      RESET PASSWORD
                    </a>

                  </td>
                </tr>
              </table>

              <!-- Backup Link -->
              <p style="
                font-size:14px;
                color:#6b7280;
                line-height:1.7;
              ">
                If the button doesn't work, copy and paste this link into your browser:
              </p>

              <div style="
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:10px;
                padding:14px;
                word-break:break-all;
                font-size:13px;
                color:#374151;
                line-height:1.6;
              ">
                ${resetPasswordLink}
              </div>

              <!-- Security Notice -->
              <div style="
                margin-top:30px;
                padding:18px;
                background:#fff7ed;
                border-left:4px solid #f7941d;
                border-radius:8px;
              ">
                <p style="
                  margin:0;
                  color:#9a3412;
                  font-size:14px;
                  line-height:1.7;
                ">
                  This password reset link will expire shortly for security purposes.
                  If you did not request a password reset, please ignore this email.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background:#f9fafb;
              padding:25px;
              text-align:center;
              border-top:1px solid #e5e7eb;
            ">

              <p style="
                margin:0;
                color:#6b7280;
                font-size:13px;
                line-height:1.7;
              ">
                © 2026 Sir Adamjee Intermediate College (SAIC)
              </p>

              <p style="
                margin:8px 0 0;
                color:#9ca3af;
                font-size:12px;
              ">
                Your Journey Begins Here
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

export default forgetPasswordTemplate;

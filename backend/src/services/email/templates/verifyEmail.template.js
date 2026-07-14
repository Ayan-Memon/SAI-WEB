const verifyEmailTemplate = (verificationLink) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
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
                      SEPARATE CLASSES FOR BOYS & GIRLS
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
                Verify Your Email Address
              </h2>

              <p style="
                color:#4b5563;
                font-size:16px;
                line-height:1.8;
                margin-top:18px;
              ">
                Welcome to the official portal of
                <strong>Sir Adamjee Intermediate College</strong>.
                Please verify your email address to activate your account securely.
              </p>

              <!-- Verify Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:40px 0;">
                <tr>
                  <td align="center">

                    <a href="${verificationLink}"
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
                      VERIFY EMAIL
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
                ${verificationLink}
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
                  This verification link will expire shortly for security purposes.
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

export default verifyEmailTemplate;

// const verifyEmailTemplate = (verificationLink) => {
//   return `
// <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://w3.org">
// <html xmlns="http://w3.org" lang="en">
// <head>
//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Email Verification</title>
// </head>

// <body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

//   <!-- Outer Background Table -->
//   <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding:40px 15px;">
//     <tr>
//       <td align="center">

//         <!-- Main Wrapper Container -->
//         <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:620px; background-color:#ffffff; border-radius:18px; border-collapse:separate;">

//           <!-- Header -->
//           <tr>
//             <td style="background-color:#2f2b2c; padding:35px 30px; border-top-left-radius:18px; border-top-right-radius:18px;">
//               <table width="100%" border="0" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <!-- Logo Circle -->
//                   <td width="90" valign="middle">
//                     <table width="72" border="0" cellpadding="0" cellspacing="0" style="background-color:#f7941d; border-radius:50%; border-collapse:separate;">
//                       <tr>
//                         <td align="center" valign="middle" height="72" style="font-size:30px; color:#ffffff; font-weight:bold; font-family:Arial, sans-serif;">
//                           SA
//                         </td>
//                       </tr>
//                     </table>
//                   </td>

//                   <!-- Brand Header -->
//                   <td valign="middle" style="font-family:Arial, sans-serif;">
//                     <h1 style="margin:0; color:#ffffff; font-size:34px; line-height:34px; font-weight:900; letter-spacing:1px;">
//                       SIR ADAMJEE
//                     </h1>
//                     <p style="margin:6px 0 0 0; color:#d1d5db; font-size:16px; font-weight:bold;">
//                       INTERMEDIATE COLLEGE
//                     </p>
                    
//                     <!-- Sub-badge built using nested table instead of div -->
//                     <table border="0" cellpadding="0" cellspacing="0" style="margin-top:10px; background-color:#f7941d; border-radius:50px; border-collapse:separate;">
//                       <tr>
//                         <td style="padding:6px 14px; color:#ffffff; font-size:12px; font-weight:bold; letter-spacing:0.5px; text-transform:uppercase;">
//                           SEPARATE CLASSES FOR BOYS & GIRLS
//                         </td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- Body Content -->
//           <tr>
//             <td style="padding:45px 35px; background-color:#ffffff; font-family:Arial, sans-serif;">
//               <h2 style="margin-top:0; color:#1f2937; font-size:28px;">
//                 Verify Your Email Address
//               </h2>
//               <p style="color:#4b5563; font-size:16px; line-height:1.8; margin-top:18px; margin-bottom:0;">
//                 Welcome to the official portal of <strong>Sir Adamjee Intermediate College</strong>. Please verify your email address to activate your account securely.
//               </p>

//               <!-- Verify Button -->
//               <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:40px 0;">
//                 <tr>
//                   <td align="center">
//                     <table border="0" cellpadding="0" cellspacing="0" style="background-color:#f7941d; border-radius:12px; border-collapse:separate;">
//                       <tr>
//                         <td align="center" style="padding:16px 38px;">
//                           <a href="${verificationLink}" target="_blank" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold; display:block; font-family:Arial, sans-serif;">
//                             VERIFY EMAIL
//                           </a>
//                         </td>
//                       </tr>
//                     </table>
//                   </td>
//                 </tr>
//               </table>

//               <!-- Backup Link Text -->
//               <p style="font-size:14px; color:#6b7280; line-height:1.7; margin:0 0 10px 0;">
//                 If the button doesn't work, copy and paste this link into your browser:
//               </p>

//               <!-- Backup URL Table Panel -->
//               <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; border:1px solid #e5e7eb; border-radius:10px; border-collapse:separate;">
//                 <tr>
//                   <td style="padding:14px; font-size:13px; color:#374151; line-height:1.6; word-break:break-all; font-family:Arial, sans-serif;">
//                     ${verificationLink}
//                   </td>
//                 </tr>
//               </table>

//               <!-- Notice Box -->
//               <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top:30px; background-color:#fff7ed; border-left:4px solid #f7941d; border-radius:4px; border-collapse:separate;">
//                 <tr>
//                   <td style="padding:18px; font-family:Arial, sans-serif; font-size:14px; color:#9a3412; line-height:1.7;">
//                     This verification link will expire shortly for security purposes.
//                   </td>
//                 </tr>
//               </table>
//             </td>
//           </tr>

//           <!-- Footer Section -->
//           <tr>
//             <td style="background-color:#f9fafb; padding:25px; text-align:center; border-top:1px solid #e5e7eb; border-bottom-left-radius:18px; border-bottom-right-radius:18px; font-family:Arial, sans-serif;">
//               <p style="margin:0; color:#6b7280; font-size:13px; line-height:1.7;">
//                 © 2026 Sir Adamjee Intermediate College (SAIC)
//               </p>
//               <p style="margin:8px 0 0 0; color:#9ca3af; font-size:12px;">
//                 Your Journey Begins Here
//               </p>
//             </td>
//           </tr>

//         </table>

//       </td>
//     </tr>
//   </table>

// </body>
// </html>
// `;
// };

// export default verifyEmailTemplate;

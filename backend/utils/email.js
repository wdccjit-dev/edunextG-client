const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendContactNotification({
  name,
  email,
  phone,
  subject,
  message,
}) {
  try {
    console.log("📧 Attempting to send email...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    const info = await transporter.sendMail({
      from: `"EduNextG Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,

      // Clicking Reply in Gmail will reply directly to the visitor
      replyTo: email,

      subject: `New Contact Enquiry - ${subject}`,

      // --------------------------------------------------
      // PLAIN TEXT VERSION
      // --------------------------------------------------
      text: `
New Contact Enquiry

A visitor has submitted a new contact enquiry through the EduNextG website.

CONTACT DETAILS
----------------
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

MESSAGE
-------
${message}

----------------
This is an automated notification from the EduNextG website.
      `.trim(),

      // --------------------------------------------------
      // PROFESSIONAL HTML EMAIL
      // --------------------------------------------------
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>New Contact Enquiry</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
  color: #263238;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f6f8; padding: 35px 15px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 650px;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                padding: 28px 35px;
                background-color: #ffffff;
                border-bottom: 1px solid #e5e7eb;
              "
            >
              <div style="
                font-size: 24px;
                font-weight: bold;
                color: #1f2937;
              ">
                EduNextG
              </div>

              <div style="
                margin-top: 5px;
                font-size: 13px;
                color: #6b7280;
              ">
                Website Notification
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding: 35px 35px 20px 35px;">

              <div style="
                display: inline-block;
                padding: 6px 12px;
                background-color: #f3f4f6;
                color: #4b5563;
                font-size: 12px;
                font-weight: bold;
                border-radius: 20px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">
                New Enquiry
              </div>

              <h1 style="
                margin: 18px 0 8px 0;
                font-size: 26px;
                line-height: 1.3;
                color: #111827;
              ">
                New Contact Enquiry
              </h1>

              <p style="
                margin: 0;
                font-size: 15px;
                line-height: 1.6;
                color: #6b7280;
              ">
                A visitor has submitted a new message through the
                EduNextG website.
              </p>

            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding: 0 35px 25px 35px;">

              <h2 style="
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #111827;
              ">
                Contact Details
              </h2>

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f8fafc;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                "
              >

                <tr>
                  <td style="
                    padding: 13px 16px;
                    width: 110px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #6b7280;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    Name
                  </td>

                  <td style="
                    padding: 13px 16px;
                    font-size: 14px;
                    color: #111827;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    ${name}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 13px 16px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #6b7280;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    Email
                  </td>

                  <td style="
                    padding: 13px 16px;
                    font-size: 14px;
                    color: #111827;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    ${email}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 13px 16px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #6b7280;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    Phone
                  </td>

                  <td style="
                    padding: 13px 16px;
                    font-size: 14px;
                    color: #111827;
                    border-bottom: 1px solid #e5e7eb;
                  ">
                    ${phone || "Not provided"}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 13px 16px;
                    font-size: 13px;
                    font-weight: bold;
                    color: #6b7280;
                  ">
                    Subject
                  </td>

                  <td style="
                    padding: 13px 16px;
                    font-size: 14px;
                    color: #111827;
                  ">
                    ${subject}
                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 35px 30px 35px;">

              <h2 style="
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #111827;
              ">
                Message
              </h2>

              <div style="
                padding: 18px;
                background-color: #f8fafc;
                border-left: 4px solid #6b7280;
                border-radius: 6px;
                font-size: 14px;
                line-height: 1.7;
                color: #374151;
                white-space: pre-line;
              ">
                ${message}
              </div>

            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td align="center" style="padding: 5px 35px 35px 35px;">

              <a
                href="mailto:${email}"
                style="
                  display: inline-block;
                  padding: 12px 24px;
                  background-color: #1f2937;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: bold;
                  border-radius: 6px;
                "
              >
                Reply to Visitor
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 22px 35px;
                background-color: #f8fafc;
                border-top: 1px solid #e5e7eb;
              "
            >

              <p style="
                margin: 0;
                font-size: 12px;
                line-height: 1.6;
                color: #9ca3af;
              ">
                This is an automated notification from the
                EduNextG website.
              </p>

              <p style="
                margin: 6px 0 0 0;
                font-size: 12px;
                color: #9ca3af;
              ">
                Please do not reply to this automated notification.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error);

    throw error;
  }
}

module.exports = sendContactNotification;
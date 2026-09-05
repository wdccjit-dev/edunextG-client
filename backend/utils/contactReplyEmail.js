const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendContactReply({
  name,
  email,
  subject,
  originalMessage,
  replyMessage,
}) {
  try {
    console.log("📧 Sending contact reply...");
    console.log("To:", email);

    const info = await transporter.sendMail({
      from: `"EduNextG India LLP" <${process.env.EMAIL_USER}>`,

      to: email,

      replyTo: process.env.EMAIL_USER,

      subject: `Re: ${subject}`,

      text: `
Dear ${name},

Thank you for contacting EduNextG India LLP.

${replyMessage}

----------------------------------------
Your original message:

${originalMessage}

Best regards,
EduNextG India LLP
Technology & Education Management Solutions
      `.trim(),

      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background: #f4f7fb;
          font-family: Arial, Helvetica, sans-serif;
        ">

          <div style="
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          ">

            <!-- HEADER -->

            <div style="
              background: #0b3558;
              padding: 28px 32px;
              color: #ffffff;
            ">

              <h2 style="
                margin: 0;
                font-size: 22px;
              ">
                EduNextG India LLP
              </h2>

              <p style="
                margin: 6px 0 0;
                font-size: 13px;
                color: #d8e7f3;
              ">
                Technology & Education Management Solutions
              </p>

            </div>

            <!-- CONTENT -->

            <div style="
              padding: 32px;
              color: #26384a;
            ">

              <p style="
                margin-top: 0;
                font-size: 15px;
              ">
                Dear <strong>${name}</strong>,
              </p>

              <p style="
                font-size: 15px;
                line-height: 1.7;
              ">
                Thank you for contacting
                <strong>EduNextG India LLP</strong>.
              </p>

              <!-- REPLY -->

              <div style="
                margin: 24px 0;
                padding: 20px;
                background: #f5f8fb;
                border-left: 4px solid #123f68;
                border-radius: 6px;
              ">

                <p style="
                  margin: 0;
                  white-space: pre-line;
                  font-size: 15px;
                  line-height: 1.7;
                  color: #26384a;
                ">
${replyMessage}
                </p>

              </div>

              <!-- ORIGINAL MESSAGE -->

              <div style="
                margin-top: 28px;
                padding-top: 20px;
                border-top: 1px solid #e5eaf0;
              ">

                <p style="
                  margin: 0 0 10px;
                  font-size: 12px;
                  font-weight: bold;
                  color: #718096;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                ">
                  Your original message
                </p>

                <p style="
                  margin: 0;
                  font-size: 14px;
                  color: #64748b;
                  line-height: 1.6;
                  white-space: pre-line;
                ">
${originalMessage}
                </p>

              </div>

              <p style="
                margin-top: 30px;
                margin-bottom: 0;
                font-size: 14px;
                line-height: 1.6;
              ">
                Best regards,<br />

                <strong>
                  EduNextG India LLP
                </strong>
              </p>

            </div>

            <!-- FOOTER -->

            <div style="
              padding: 18px 32px;
              background: #f8fafc;
              border-top: 1px solid #e5eaf0;
              text-align: center;
            ">

              <p style="
                margin: 0;
                font-size: 12px;
                color: #718096;
              ">
                This email was sent by EduNextG India LLP.
              </p>

            </div>

          </div>

        </div>
      `,
    });

    console.log("✅ Contact reply sent successfully!");
    console.log("Message ID:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ Contact reply email failed:");
    console.error(error);

    throw error;
  }
}

module.exports = sendContactReply;
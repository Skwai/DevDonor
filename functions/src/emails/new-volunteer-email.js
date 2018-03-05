exports.text = (locals) => `
You have a new volunteer for your project: ${locals.projectTitle}

${locals.volunteerName}
${locals.volunteerEmail}

Message:

${locals.volunteerMessage}
`

exports.html = (locals) => `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional //EN">
<html>
  <head>
    <title>DevDonor</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
    <table border="0" cellpadding="0" cellspacing="20" style="max-width: 600px; font-size: 15px; font-family: medium-ui-sans-serif-text-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
      <tr>
        <td style="border-bottom: #dae1e9 solid 1px; padding-bottom: 20px;"><img src="https://devdonor.com/logo.png" alt="DevDonor" height="16" width="97"></td>
      </tr>
      <tr>
        <td style="color: #232f41;">
          You have a new volunteer for your project: <strong>${locals.projectTitle}</strong>
        </td>
      </tr>
      <tr>
        <td>
          <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; border: #dae1e9 solid 1px; box-shadow: #dae1e9 0 2px 10px">
            <tr>
              <td style="width: 50px; padding: 20px 0 20px 20px; border-bottom: #dae1e9 solid 1px;"><img width="50" height="50" src="${
                locals.volunteerPicture
              }"></td>
              <td style="padding: 20px; border-bottom: #dae1e9 solid 1px;">
                <strong>${locals.volunteerName}</strong>
                <br>
                <a style="color: #1D75FD" href="mailto:${locals.volunteerEmail}">${
  locals.volunteerEmail
}</a>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style="padding: 20px 20px 0;">
                <strong>Message</strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td style="line-height: 1.7; padding: 20px 20px 0; color: #596980; font-size: 14px;">
                ${locals.volunteerMessage}
              </td>
            </tr>
            <tr>
              <td></td>
              <td style="padding: 20px 20px 20px;">
                <strong><a style="color: #1D75FD" href="${
                  locals.volunteerEmail
                }">Reply to message</a></strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`

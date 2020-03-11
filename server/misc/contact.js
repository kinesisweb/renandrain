const common = require(__basedir + "/lib/common.js");
const settings = require(__basedir + "/renandrain/settings.json");
const fs = require("fs");

const self = (module.exports = {
  sendEmail: function(fields) {
    return new Promise((resolve, reject) => {
      const files = [];
      fields.files.forEach(file => {
        const ext = file.split(".").pop();
        const type =
          ext === "png"
            ? "image/png"
            : ext === "jpg"
            ? "image/jpeg"
            : ext === "jpeg"
            ? "image/jpeg"
            : ext === "pdf"
            ? "application/pdf"
            : ext === "docx"
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : ext === "zip"
            ? "application/zip"
            : "";
        if (!type) return;
        const read = fs.readFileSync(file);
        const b64file = Buffer.from(read).toString("base64");
        files.push({
          content: b64file,
          filename: file.split("/").pop(),
          disposition: "attachment",
          contentId: file
            .split("/")
            .pop()
            .split(".")[0],
          type: type
        });
      });
      const message = {
        to: settings.admin_email,
        from: fields.email,
        subject: "Ren & Rain Contact Form",
        html: `
						<table style="width: 100%">
							<tr>
								<td style="width: 100%; background-color: #91b3bc; padding: 10px;">
									<img src="https://renandrain.com/static/img/email_logo.png">
								</td>
							</tr>
							<tr>
								<td><br><br><b>Message received from ${fields.firstName} ${fields.lastName} (${fields.email})</b><br></td>
							</tr>
							<tr>
								<td><p><br><br>${fields.message}</p></td>
							</tr>
						</table>
					`,
        attachments: files
      };
      common
        .sendMail(message)
        .then(resolve)
        .catch(reject);
    });
  }
});

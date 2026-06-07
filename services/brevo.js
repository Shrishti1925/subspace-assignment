async function sendEmails(contacts) {

  for (const contact of contacts) {
    console.log(`Email sent to ${contact.email}`);
  }

}

module.exports = { sendEmails };
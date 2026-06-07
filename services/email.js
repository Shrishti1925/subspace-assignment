async function getEmails(contacts) {

  return contacts.map(contact => ({
    ...contact,
    email: `${contact.name.toLowerCase().replace(" ", ".")}@company.com`
  }));

}

module.exports = { getEmails };
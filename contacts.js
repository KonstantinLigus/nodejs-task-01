const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");
// TODO: задокументировать каждую функцию

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(
    ({ id }) => id === contactId.toString()
  );
  if (contactIdFromArr === -1) {
    console.log("There is no such contact!");
    return null;
  }
  return contacts[contactIdFromArr];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdFromArr = contacts.findIndex(
    ({ id }) => id === contactId.toString()
  );
  if (contactIdFromArr === -1) {
    console.log("There is no such contact!");
    return null;
  }
  const deletedContact = contacts.splice(contactIdFromArr, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  contacts.push({ id: uuidv4(), name, email, phone });
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

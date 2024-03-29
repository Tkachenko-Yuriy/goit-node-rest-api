import contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  try {
    const contactsList = await contactsService.listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await contactsService.getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await contactsService.removeContact(contactId);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = [
  validateBody(createContactSchema),
  async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      res.status(201).json(newContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

export const updateContact = [
  validateBody(updateContactSchema),
  async (req, res) => {
    try {
      const contactId = req.params.id;
      const updatedData = req.body;

      if (Object.keys(updatedData).length === 0) {
        throw new HttpError(400, "Body must have at least one field");
      }

      const updatedContact = await contactsService.updateContact(
        contactId,
        updatedData
      );
      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      next(error);
    }
  },
];

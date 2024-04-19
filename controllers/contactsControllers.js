import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const contactsList = await contactsService.getAllContacts(
      { owner },
      { skip, limit }
    );
    const total = await contactsService.countContacts({ owner });

    res.status(200).json({contactsList,
      total});
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contact = await contactsService.getOneContactByFilter({
      owner,
      _id: id,
  });
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const deletedContact = await contactsService.removeContact({
      owner,
      _id: id,
  });
    if (!deletedContact) {
      throw HttpError(404);
    }
    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const newContact = await contactsService.createContact({
      name,
      email,
      phone,
      owner,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const updatedData = req.body;

    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const updatedContact = await contactsService.updateContact(
      { owner, _id: id },
      updatedData
    );

    if (!updatedContact) {
      throw HttpError(404);
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const contactExists = await contactsService.getOneContactByFilter({ owner, _id: id });
    if (!contactExists) {
      throw HttpError(404);
    }

    const updateContact = await contactsService.updateStatusContact(
      id,
      req.body
    );

    if (!updateContact) {
      throw HttpError(404);
    }

    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
};

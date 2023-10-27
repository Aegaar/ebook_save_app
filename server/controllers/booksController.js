const Books = require("../models/BooksModel");
const mongoose = require("mongoose");
const fs = require("fs");

//ALL BOOKS

const getBooks = async (req, res) => {
  const user_id = req.user._id;

  const books = await Books.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(books);
};

//SINGLE BOOK DOWNLOAD

const getBook = async (req, res) => {
  const { id, file } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `Książka nie została znaleziona` });
  }

  const book = await Books.findById(id);

  if (!book) {
    return res.status(404).json({ error: `Książka nie została znaleziona` });
  }

  res.download(book.file);
};

//CREATE BOOK

const createBook = async (req, res, next) => {
  console.log(req.body);
  const { title, author } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Wypełnij wszystkie pola", emptyFields });
  }

  try {
    const user_id = req.user._id;
    let book = new Books({
      title: req.body.title,
      author: req.body.author,
      file: req.body.file,
      user_id: user_id,
    });

    if (req.file) {
      book.file = req.file.path;
    }

    await book.save();

    return res.status(201).json(book);
  } catch (error) {
    console.error("Błąd podczas zapisywania książki:", error);

    return res
      .status(500)
      .json({ error: "Wystąpił błąd podczas zapisywania książki." });
  }
};

//DEL BOOK

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Książka nie została znaleziona" });
  }

  try {
    const book = await Books.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: "Książka nie została znaleziona" });
    }

    if (book.file) {
      fs.unlinkSync(book.file);
    }

    res.status(200).json({ _id: book._id });
  } catch (error) {
    console.error("Błąd podczas usuwania książki:", error.message);
    res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

module.exports = {
  createBook,
  getBook,
  getBooks,
  deleteBook,
};

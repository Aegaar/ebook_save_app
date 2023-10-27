const express = require("express");
const {
  createBook,
  getBook,
  getBooks,
  deleteBook,
} = require("../controllers/booksController");

const requireAuth = require("../middleware/requireAuth");

const upload = require("../middleware/upload");

const router = express.Router();

router.use(requireAuth);

//all books

router.get("/", getBooks);

//single book download
router.get("/:id", getBook);

//add new book

router.post("/", upload.single("file"), createBook);

//delate book

router.delete("/:id", deleteBook);

module.exports = router;

import { React, useState, useRef } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BooksForm = () => {
  const { user } = useAuthContext();
  const inputRef = useRef(null);
  const { dispatch } = useBooksContext();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("Musisz być zalogowany");
      return;
    }

    inputRef.current.value = null;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("file", file);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        dispatch({ type: "CREATE_BOOK", payload: json });
        setTitle("");
        setAuthor("");
        setFile(null);
        setError(null);
        setEmptyFields([]);
      }
    } catch (error) {
      setError("Wystąpił błąd podczas wysyłania zapytania.");
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <label>Wybierz plik</label>
      <input
        ref={inputRef}
        type="file"
        required
        accept=".mp3, audio/mpeg, audio, .pdf, .txt, .epub, .rb, .mobi, .azw3, .docx, .fb2, .lit, lrf, .pdb, .pmlz, .rtf, .snb, tcr, .snb, txtz"
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
      />
      <h3>Dodaj nową książkę</h3>

      <label>Podaj tytuł</label>
      <input
        value={title}
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        style={{ borderColor: emptyFields.includes("title") ? "red" : "" }}
      />
      <label>Podaj autora</label>
      <input
        type="text"
        onChange={(event) => {
          setAuthor(event.target.value);
        }}
        value={author}
        style={{ borderColor: emptyFields.includes("author") ? "red" : "" }}
      />
      <button>Dodaj książke</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default BooksForm;

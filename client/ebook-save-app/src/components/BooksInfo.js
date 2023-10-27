import FileDownload from "js-file-download";
import { useBooksContext } from "../hooks/useBooksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { pl } from "date-fns/locale";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const BooksInfo = (props) => {
  const [deleteError, setDeleteError] = useState(null);
  const [downloadError, setDownloadError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useBooksContext();

  const getExtensionAfterDot = (inputString) => {
    const dotIndex = inputString.lastIndexOf(".");
    if (dotIndex !== -1 && dotIndex < inputString.length - 1) {
      return inputString.substring(dotIndex + 1);
    } else {
      return "";
    }
  };

  const download = (event) => {
    if (!user) {
      return;
    }

    event.preventDefault();

    fetch(`/api/books/${props.book._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setDownloadError(`Błąd sieci: ${response.status}`);
        } else {
          setDownloadError(null);
        }
        return response.blob();
      })
      .then((data) => {
        const extension = getExtensionAfterDot(props.book.file);
        FileDownload(data, `${props.book.title}.${extension}`);
      })
      .catch((error) => {
        setDownloadError("Błąd:", error);
      });
  };

  const deleteBook = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(`/api/books/${props.book._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      } else {
        setDeleteError(null);
      }

      dispatch({ type: "DELETE_BOOK", payload: { _id: props.book._id } });
    } catch (error) {
      setDeleteError("Błąd podczas usuwania książki:", error.message);

      if (error.message.includes("404")) {
        setDeleteError("Książka nie została znaleziona.");
      } else {
        setDeleteError("Wystąpił błąd podczas usuwania książki.");
      }
    }
  };

  return (
    <div>
      <h4>{props.book.title}</h4>
      <p>{props.book.author}</p>
      <p>
        Dodano{" "}
        {formatDistanceToNow(new Date(props.book.createdAt), {
          locale: pl,
          addSuffix: true,
        })}
      </p>

      <div>
        <button onClick={deleteBook}>Usuń książkę</button>
        {setDeleteError && <div>{deleteError}</div>}
      </div>
      <div>
        <button onClick={(event) => download(event)}>Pobierz ksiązkę</button>
        {downloadError && <div>{downloadError}</div>}
      </div>
    </div>
  );
};

export default BooksInfo;

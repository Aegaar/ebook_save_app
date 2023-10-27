import React, { useEffect, useState } from "react";
import BooksInfo from "../components/BooksInfo";
import BooksForm from "../components/BooksForm";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const [error, setError] = useState(null);
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          setError("Błąd sieci");
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        dispatch({ type: "SET_BOOKS", payload: json });
      } catch (error) {
        console.error("Error fetching books:", error.message);
        setError("Nie udało się pobrać zawartości");
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [dispatch, user]);

  return (
    <div className="bg-light">
      <div>
        {books && books.map((book) => <BooksInfo key={book._id} book={book} />)}
        {error && <div>{error}</div>}
      </div>
      <BooksForm />
    </div>
  );
};

export default Home;

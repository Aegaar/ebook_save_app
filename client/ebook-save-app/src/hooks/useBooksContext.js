import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw Error("context must be use inside a context provider");
  }

  return context;
};

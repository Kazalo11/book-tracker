import { Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mapIsbnToBook } from "../../mapping/BookMapping";
import { Book } from "../../types/books";
import BookItem from "../BookItem";
import FileUpload from "../FileUpload";
import { Button } from "../ui/button";

export default function CreatePage() {
  const [isbns, setIsbns] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const newBooks: Book[] = isbns.map((isbn) => {
      return mapIsbnToBook(isbn);
    });
    setBooks((previousBooks) => {
      for (const book of newBooks) {
        if (!previousBooks.includes(book)) {
          previousBooks.push(book);
        }
      }
      return previousBooks;
    });
  }, [isbns]);

  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>Upload a barcode of a book</Card.Title>
        <Card.Description>
          <FileUpload setIsbns={setIsbns} />
          {books.map((book, index) => {
            return (
              <div key={index}>
                <BookItem book={book} />
              </div>
            );
          })}
          {books && (
            <Button size="md" colorPalette={"blue"}>
              Add Book
            </Button>
          )}
        </Card.Description>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}

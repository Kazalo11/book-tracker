import { Card, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type BookItemProps = {
  isbn: string;
};

type BookItemResponse = {
  numFound: number;
  docs: {
    author_name: string[];
    title: string;
    isbn: string[];
  }[];
};

type Book = {
  title: string;
  author: string;
  imageLink?: string;
};

export default function BookItem({ isbn }: BookItemProps) {
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    async function imageExists(isbn: string): Promise<string> {
      try {
        const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=False`;
        const response = await fetch(url);
        if (response.status == 404) {
          console.log(`URL ${url} returned 404`);
          return "";
        } else {
          console.log(`URL ${url} returned status: ${response.status}`);
          return url;
        }
      } catch (error) {
        console.error(`Error fetching URL`, error);
        return "";
      }
    }
    async function getBook() {
      const url = `https://openlibrary.org/search.json?q=isbn%3D${isbn}`;

      const response: BookItemResponse = await fetch(url).then((response) =>
        response.json()
      );
      if (!response.numFound) {
        return;
      }

      const bookItem: Book = {
        title: response.docs[0].title,
        author: response.docs[0].author_name[0],
      };
      for (const isbn of response.docs[0].isbn) {
        const url = await imageExists(isbn);
        if (url.length) {
          bookItem.imageLink = url;
        }
      }

      setBook(bookItem);
    }
    getBook();
  }, [isbn]);

  return (
    book && (
      <Card.Root>
        <Card.Body>
          <Card.Title>
            {book.title} by {book.author}
          </Card.Title>
          <Card.Description>
            <Image rounded={"md"} src={book.imageLink} alt="Book image" />
          </Card.Description>
        </Card.Body>
      </Card.Root>
    )
  );
}

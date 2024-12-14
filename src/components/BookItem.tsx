import { Card, Image } from "@chakra-ui/react";
import { Book } from "../types/books";

type BookItemProps = {
  book: Book;
};

export default function BookItem({ book }: BookItemProps) {
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

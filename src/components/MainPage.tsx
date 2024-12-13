import { Card } from "@chakra-ui/react";
import { useState } from "react";
import BookItem from "./BookItem";
import FileUpload from "./FileUpload";

export default function MainPage() {
  const [isbns, setIsbns] = useState<string[]>([]);

  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>Upload a barcode of a book</Card.Title>
        <Card.Description>
          <FileUpload setIsbns={setIsbns} />
          {isbns.map((isbn, index) => {
            return (
              <div key={index}>
                <BookItem isbn={isbn} />;
              </div>
            );
          })}
        </Card.Description>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}

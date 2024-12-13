import { Card } from "@chakra-ui/react";
import FileUpload from "./FileUpload";

export default function MainPage() {
  return (
    <Card.Root>
      <Card.Body>
        <Card.Title>Upload a barcode of a book</Card.Title>
        <Card.Description>
          <FileUpload />
        </Card.Description>
      </Card.Body>
      <Card.Footer />
    </Card.Root>
  );
}

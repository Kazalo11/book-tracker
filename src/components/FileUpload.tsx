import { Button } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "./ui/file-upload";

export default function FileUpload() {
  const onFileAccept = async (details: FileUploadFileAcceptDetails) => {
    const files: File[] = details.files;
    const detector = await createDetector();
    let isbns: string[] = [];
    for (const file of files) {
      const isbn = await extractISBNs(file, detector);
      isbns = isbns.concat(isbn);
    }
  };
  return (
    <FileUploadRoot onFileAccept={onFileAccept}>
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  );
}

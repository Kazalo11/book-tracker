import { Button, FileUploadFileAcceptDetails } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";
import { createDetector, extractISBNs } from "./Detector";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "./ui/file-upload";

type FileUploadProps = {
  setIsbns: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FileUpload({ setIsbns }: FileUploadProps) {
  const onFileAccept = async (details: FileUploadFileAcceptDetails) => {
    const files: File[] = details.files;
    const detector = await createDetector();
    let isbns: string[] = [];
    for (const file of files) {
      const isbn = await extractISBNs(file, detector);
      isbns = isbns.concat(isbn);
    }
    console.log(isbns);
    setIsbns(isbns);
  };
  return (
    <FileUploadRoot
      onFileAccept={onFileAccept}
      accept={["image/png", "image/jpeg"]}
    >
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  );
}

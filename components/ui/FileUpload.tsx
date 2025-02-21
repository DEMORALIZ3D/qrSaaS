import { UploadFile } from "@mui/icons-material";
import { styled, IconButton, Button } from "@mui/material";
import { useRef, useCallback, ChangeEvent } from "react";

interface FileUploadButtonProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  id?: string;
}

const HiddenInput = styled("input")({
  display: "none",
});

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileSelected,
  accept,
  id = "file-upload-button",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileSelected(file);
      }
      // Reset the input value to allow selecting the same file again
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onFileSelected]
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button
        id={id}
        color="primary"
        aria-label="upload file"
        component="span"
        onClick={handleClick}
        startIcon={<UploadFile />}
      >
        Upload Image
      </Button>
      <HiddenInput
        id={`${id}-hidden-input`}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={inputRef}
      />
    </>
  );
};

export default FileUploadButton;

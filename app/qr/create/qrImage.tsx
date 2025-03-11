import FileUploadButton from "@/components/ui/FileUpload";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import QRCodeStyling, { Options } from "qr-code-styling";
import { Dispatch, RefObject, SetStateAction } from "react";

const QRImageOptions = ({
  qrCodeRef,
  debouncedLog,
  opts,
  setOpts,
}: {
  qrCodeRef: RefObject<QRCodeStyling | null>;
  debouncedLog: (props: Partial<Options>) => void;
  opts: Partial<Options>;
  setOpts: Dispatch<SetStateAction<{ title: string } & Partial<Options>>>;
}) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">Center Image</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ gap: 2 }}>
        <FileUploadButton
          accept="image/*"
          onFileSelected={(file) => {
            if (qrCodeRef.current) {
              qrCodeRef.current.update({
                image: URL.createObjectURL(file),
              });
            }
          }}
        />

        <TextField
          label="Image Size"
          type="number"
          value={opts.imageOptions?.imageSize ?? 1}
          slotProps={{
            input: {
              inputProps: {
                min: 0,
                max: 1,
                step: 0.1,
              },
            },
          }}
          onChange={(e) => {
            const { value } = e.target;
            setOpts((prev) => ({
              ...prev,
              imageOptions: {
                ...prev.imageOptions,
                imageSize: value === "" ? 0 : parseFloat(value),
              },
            }));
            debouncedLog({
              imageOptions: { imageSize: parseFloat(value) },
            });
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={opts.imageOptions?.hideBackgroundDots ?? true}
              onChange={(e) => {
                setOpts((prev) => ({
                  ...prev,
                  imageOptions: {
                    ...prev.imageOptions,
                    hideBackgroundDots: e.target.checked,
                  },
                }));
                if (qrCodeRef.current) {
                  qrCodeRef.current.update({
                    imageOptions: {
                      hideBackgroundDots: e.target.checked,
                    },
                  });
                }
              }}
            />
          }
          label="Add Margin"
        />
        <TextField
          label="margin"
          type="number"
          value={opts.imageOptions?.margin ?? 0}
          onChange={(e) => {
            const { value } = e.target;
            setOpts((prev) => ({
              ...prev,
              imageOptions: {
                ...prev.imageOptions,
                margin: parseFloat(value),
              },
            }));
            debouncedLog({
              imageOptions: { margin: parseInt(value) },
            });
          }}
          disabled={!opts.imageOptions?.hideBackgroundDots}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default QRImageOptions;

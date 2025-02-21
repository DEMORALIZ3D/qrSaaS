import ButtonGroupButton from "@/components/ui/ButtonGroupButton";
import MultiColourPicker from "@/components/ui/MultiColourPicker";
import { GradientOptions } from "@/lib/utils";
import { Circle, ExpandMore, Square, SquareRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid2,
  ButtonGroup,
  Box,
} from "@mui/material";
import QRCodeStyling, { Options } from "qr-code-styling";
import { RefObject } from "react";

const CornerOptions = ({
  qrCodeRef,
  defaultOpts,
  MultiColourPickerChange,
}: {
  qrCodeRef: RefObject<QRCodeStyling | null>;
  defaultOpts: Options;
  MultiColourPickerChange: (
    nc: string | GradientOptions,
    type:
      | "backgroundOptions"
      | "dotsOptions"
      | "cornersSquareOptions"
      | "cornersDotOptions"
  ) => void;
}) => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">Corner Options</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 container spacing={2}>
          <Grid2 size={6} display="flex" flexDirection="column">
            <Typography variant="caption">Corner Square</Typography>
            <ButtonGroup aria-label="Basic button group">
              <ButtonGroupButton
                icon={Square}
                onClick={() => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersSquareOptions: { type: "square" },
                    });
                  }
                }}
              />
              <ButtonGroupButton
                icon={Circle}
                onClick={() => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersSquareOptions: { type: "dot" },
                    });
                  }
                }}
              />

              <ButtonGroupButton
                icon={SquareRounded}
                onClick={() => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersSquareOptions: { type: "extra-rounded" },
                    });
                  }
                }}
              />
            </ButtonGroup>
            <Box>
              <Typography variant="caption">Corner Square Color</Typography>
              <MultiColourPicker
                defaultColor={defaultOpts.cornersSquareOptions?.color ?? "#000"}
                callback={(nc) =>
                  MultiColourPickerChange(nc, "cornersSquareOptions")
                }
              />
            </Box>
          </Grid2>
          <Grid2 size={6} display="flex" flexDirection="column">
            <Typography variant="caption">Corner Dot</Typography>
            <ButtonGroup aria-label="Basic button group">
              <ButtonGroupButton
                icon={Square}
                onClick={() => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersSquareOptions: { type: "square" },
                    });
                  }
                }}
              />
              <ButtonGroupButton
                icon={Circle}
                onClick={() => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersDotOptions: { type: "dot" },
                    });
                  }
                }}
              />
            </ButtonGroup>
            <Box>
              <Typography variant="caption">Corner Dot Color</Typography>
              <MultiColourPicker
                defaultColor={defaultOpts.cornersDotOptions?.color ?? "#000"}
                callback={(nc) =>
                  MultiColourPickerChange(nc, "cornersDotOptions")
                }
              />
            </Box>
          </Grid2>
        </Grid2>
      </AccordionDetails>
    </Accordion>
  );
};

export default CornerOptions;

import MultiColourPicker from "@/components/ui/MultiColourPicker";
import { GradientOptions } from "@/lib/utils";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid2,
  TextField,
} from "@mui/material";
import { Options } from "qr-code-styling";
import { Dispatch, SetStateAction } from "react";

const BackgroundForeground = ({
  debouncedLog,
  debounceColour,
  defaultOpts,
  opts,
  setOpts,
  MultiColourPickerChange,
}: {
  debouncedLog: (props: Partial<Options>) => void;
  debounceColour: (props: Partial<Options>) => void;
  defaultOpts: Options;
  opts: Partial<Options>;
  setOpts: Dispatch<SetStateAction<{ title: string } & Partial<Options>>>;
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
        <Typography component="span">Background/Foreground</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ gap: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <Typography variant="caption">Background</Typography>
            <MultiColourPicker
              defaultColor={defaultOpts.backgroundOptions?.color ?? "#000"}
              callback={(nc) =>
                MultiColourPickerChange(nc, "backgroundOptions")
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <Typography variant="caption">Foreground</Typography>
            <MultiColourPicker
              defaultColor={defaultOpts.dotsOptions?.color ?? "#000"}
              callback={(newColor) => {
                const isSolid = typeof newColor === "string";
                const result = {
                  [!isSolid ? "color" : "gradient"]: null,
                  [isSolid ? "color" : "gradient"]: isSolid
                    ? newColor
                    : {
                        type: "linear",
                        rotation: newColor.rotation,
                        colorStops: [
                          { offset: 0, color: newColor.from },
                          { offset: 1, color: newColor.to },
                        ],
                      },
                };
                debounceColour({
                  dotsOptions: result,
                  cornersDotOptions: result,
                  cornersSquareOptions: result,
                });
              }}
            />
          </Grid2>
        </Grid2>
        <TextField
          label="QR Padding"
          type="number"
          value={opts.margin ?? 0}
          onChange={(e) => {
            const { value } = e.target;
            debouncedLog({ margin: parseInt(value) });
            setOpts((prev) => ({
              ...prev,
              margin: parseInt(value),
            }));
          }}
          disabled={!opts.imageOptions?.hideBackgroundDots}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default BackgroundForeground;

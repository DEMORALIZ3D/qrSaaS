import ClassySVG from "@/components/svg/classy";
import DotsSVG from "@/components/svg/dots";
import ExtraRoundedSvg from "@/components/svg/extraRounded";
import RoundedSVG from "@/components/svg/rounded";
import SquareSVG from "@/components/svg/square";
import SquareRoundedIcon from "@/components/svg/squareRounded";
import ButtonGroupButton from "@/components/ui/ButtonGroupButton";
import ColourPicker from "@/components/ui/ColorPicker";
import {
  Typography,
  ButtonGroup,
  Button,
  TextField,
  Grid2,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Circle,
  ContactPage,
  ExpandMore,
  Http,
  Square,
  SquareRounded,
  WifiPassword,
} from "@mui/icons-material";
import QRCodeStyling, { Options } from "qr-code-styling";
import FileUploadButton from "@/components/ui/FileUpload";
import { GradientOptions, updateNestedObject } from "@/lib/utils";
import useDebouncedCallback from "@/hooks/useDebounceState";
import { useState } from "react";
import GradientPicker from "@/components/ui/GradientPicker";
import MultiColourPicker from "@/components/ui/MultiColourPicker";
import BackgroundForeground from "./backgroundForeground";
import DotsOptions from "./dotsOptions";
import QRImageOptions from "./qrImage";
import CornerOptions from "./cornerOptions";

const CustomiseQRForm = ({
  qrCodeRef,
  opts,
  setOpts,
  defaultOpts,
}: {
  qrCodeRef: React.RefObject<QRCodeStyling | null>;
  opts: Options;
  setOpts: React.Dispatch<React.SetStateAction<Options>>;
  defaultOpts: Options;
}) => {
  const debouncedLog = useDebouncedCallback((value: Partial<Options>) => {
    // Simulate an API call or some other expensive operation
    console.log("API call with:", value);
    if (qrCodeRef.current) {
      qrCodeRef.current.update(value);
    }
  }, 1000);

  const debounceColour = useDebouncedCallback((value: Partial<Options>) => {
    // Simulate an API call or some other expensive operation
    console.log("API call with:", value);
    if (qrCodeRef.current) {
      qrCodeRef.current.update(value);
    }
  }, 200);

  const MultiColourPickerChange = (
    newColor: string | GradientOptions,
    key:
      | "backgroundOptions"
      | "dotsOptions"
      | "cornersSquareOptions"
      | "cornersDotOptions"
  ) => {
    const isSolid = typeof newColor === "string";
    debounceColour({
      [key]: {
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
      },
    });
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ButtonGroup aria-label="QR code type">
          <ButtonGroupButton icon={Http} />
          <ButtonGroupButton icon={WifiPassword} disabled />
          <ButtonGroupButton icon={ContactPage} disabled />
        </ButtonGroup>
        <TextField
          label="URL"
          fullWidth
          value={opts.data}
          onChange={(e) => {
            const { value } = e.target;
            setOpts((prev) => ({ ...prev, data: value }));
            debouncedLog({ data: value });
          }}
          size="small"
        />
      </Box>
      <Box>
        <BackgroundForeground
          {...{
            debouncedLog,
            debounceColour,
            defaultOpts,
            opts,
            setOpts,
            MultiColourPickerChange,
          }}
        />
        <DotsOptions
          {...{
            qrCodeRef,
            defaultOpts,
            MultiColourPickerChange,
          }}
        />
        <CornerOptions
          {...{
            qrCodeRef,
            defaultOpts,
            MultiColourPickerChange,
          }}
        />
        <QRImageOptions
          {...{
            qrCodeRef,
            debouncedLog,
            opts,
            setOpts,
          }}
        />
      </Box>
    </>
  );
};

export default CustomiseQRForm;

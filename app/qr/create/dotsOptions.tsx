import ClassySVG from "@/components/svg/classy";
import DotsSVG from "@/components/svg/dots";
import ExtraRoundedSvg from "@/components/svg/extraRounded";
import RoundedSVG from "@/components/svg/rounded";
import SquareSVG from "@/components/svg/square";
import ButtonGroupButton from "@/components/ui/ButtonGroupButton";
import MultiColourPicker from "@/components/ui/MultiColourPicker";
import { GradientOptions } from "@/lib/utils";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ButtonGroup,
  Box,
} from "@mui/material";
import QRCodeStyling, { Options } from "qr-code-styling";
import { Dispatch, RefObject, SetStateAction } from "react";

const DotsOptions = ({
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
        <Typography component="span">Dots Options</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ButtonGroup aria-label="Basic button group">
          <ButtonGroupButton
            icon={DotsSVG}
            onClick={() => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { type: "dots" },
                });
              }
            }}
          />
          <ButtonGroupButton
            icon={SquareSVG}
            onClick={() => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { type: "square" },
                });
              }
            }}
          />
          <ButtonGroupButton
            icon={RoundedSVG}
            onClick={() => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { type: "rounded" },
                });
              }
            }}
          />
          <ButtonGroupButton
            icon={ExtraRoundedSvg}
            onClick={() => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { type: "extra-rounded" },
                });
              }
            }}
          />
          <ButtonGroupButton
            icon={ClassySVG}
            onClick={() => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { type: "classy" },
                });
              }
            }}
          />
        </ButtonGroup>
        <Box>
          <Typography variant="caption">Dots Color</Typography>
          <MultiColourPicker
            defaultColor={defaultOpts.dotsOptions?.color ?? "#000"}
            callback={(nc) => MultiColourPickerChange(nc, "dotsOptions")}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default DotsOptions;

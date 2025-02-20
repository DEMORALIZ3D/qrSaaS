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
} from "@mui/material";
import {
  Globe,
  HouseWifi,
  Contact,
  GripHorizontal,
  Square,
  RectangleHorizontal,
  Circle,
} from "lucide-react";
import QRCodeStyling, { Options } from "qr-code-styling";

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
        <Typography variant="h6">QR/Type</Typography>
        <ButtonGroup aria-label="QR code type">
          <ButtonGroupButton icon={Globe} title="URL" />
          <ButtonGroupButton icon={HouseWifi} title="Wifi" disabled />
          <ButtonGroupButton icon={Contact} title="vCard" disabled />
        </ButtonGroup>
        <TextField
          label="URL"
          fullWidth
          value={opts.data}
          onChange={(e) => {
            const { value } = e.target;
            setOpts((prev) => ({ ...prev, data: value }));
            console.log("should update", { value });
          }}
          onBlur={(e) => {
            if (qrCodeRef.current) {
              const { value } = e.target;

              console.log("onBlur", { value });
              qrCodeRef.current.update({ data: value });
            }
          }}
          size="small"
        />
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Background/Foreground</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <ColourPicker
              title="Background Color"
              defaultColor={defaultOpts.backgroundOptions?.color ?? "#fff"}
              onChange={(newColor) => {
                if (qrCodeRef.current) {
                  qrCodeRef.current.update({
                    backgroundOptions: { color: newColor },
                  });
                }
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <ColourPicker
              title="Foreground Color"
              defaultColor={defaultOpts.dotsOptions?.color ?? "#fff"}
              onChange={(newColor) => {
                if (qrCodeRef.current) {
                  qrCodeRef.current.update({
                    dotsOptions: { color: newColor },
                    cornersDotOptions: { color: newColor },
                    cornersSquareOptions: { color: newColor },
                  });
                }
              }}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Dots Options</Typography>
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
          <ColourPicker
            title="Dots Color"
            defaultColor={defaultOpts.dotsOptions?.color ?? "#000"}
            onChange={(newColor) => {
              if (qrCodeRef.current) {
                qrCodeRef.current.update({
                  dotsOptions: { color: newColor },
                });
              }
            }}
          />
        </Box>
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Corner Options</Typography>
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
                icon={SquareRoundedIcon}
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
              <ColourPicker
                title="Corner Square Color"
                defaultColor={defaultOpts.cornersSquareOptions?.color ?? "#000"}
                onChange={(newColor) => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersSquareOptions: { color: newColor },
                    });
                  }
                }}
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
              <ColourPicker
                title="Corner Dot Color"
                defaultColor={defaultOpts.cornersDotOptions?.color ?? "#000"}
                onChange={(newColor) => {
                  if (qrCodeRef.current) {
                    qrCodeRef.current.update({
                      cornersDotOptions: { color: newColor },
                    });
                  }
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default CustomiseQRForm;

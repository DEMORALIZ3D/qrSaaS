import { Box, Grid2, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { createGradientCSS, GradientOptions } from "@/lib/utils";
import ColourPicker from "./ColorPicker";

const GradientPicker = ({
  onChange,
}: {
  onChange: (props: GradientOptions) => void;
}) => {
  const [gradient, setGradient] = useState<GradientOptions>({
    from: "#000",
    to: "#fff",
    rotation: 0,
  });

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}
    >
      <div
        style={{
          width: "100%",
          height: "25px",
          background: createGradientCSS(gradient),
          borderRadius: "4px",
        }}
      />
      <Grid2 container width="100%" gap={0.5}>
        <Grid2 size="grow" display="flex">
          <StyledColorPickerWrapper>
            <ColourPicker
              defaultColor={"#000"}
              onChange={(color) => {
                setGradient((p) => {
                  const result = { ...p, from: color };
                  onChange(result);
                  return result;
                });
              }}
            />
            <ColorPicker
              defaultColor={"#fff"}
              onChange={(color) => {
                setGradient((p) => {
                  const result = { ...p, to: color };
                  onChange(result);
                  return result;
                });
              }}
            />
          </StyledColorPickerWrapper>
        </Grid2>
        <Grid2 size="auto" display="flex" flexDirection="column">
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  //   content: '"\xB0"',
                  content: '"°"',
                  position: "absolute",
                  fontSize: 24,
                  right: 25,
                  top: -2,
                },
              }}
            >
              <Box
                component="input"
                placeholder="Rotation"
                type="number"
                value={gradient.rotation}
                min={0}
                max={360}
                onChange={(e) => {
                  setGradient((p) => {
                    const result = { ...p, rotation: parseInt(e.target.value) };
                    onChange(result);
                    return result;
                  });
                }}
                sx={{
                  paddingLeft: 1,
                  borderRadius: "4px",
                  boxShadow: `0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)`,
                  height: 28,
                  position: "relative",
                }}
              />
            </Box>
            <Box
              sx={{
                width: 15,
                height: 15,
                border: "1px solid grey",
                borderRadius: "50%", // Makes it a circle
                background: `conic-gradient(
                #000 0deg ${gradient.rotation}deg,
                #fff ${gradient.rotation}deg 360deg
              )`,
              }}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

const StyledColorPickerWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  "& > div:first-of-type .swatch": {
    borderRight: "none",
    borderRadius: "4px 0 0 4px",
  },
  "& > div:last-of-type .swatch": {
    borderLeft: "none",
    borderRadius: "0 4px 4px 0",
  },
  "& > div": {
    minWidth: "25px",
  },
}));

export default GradientPicker;

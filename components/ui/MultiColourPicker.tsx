import { useState } from "react";
import ColourPicker from "./ColorPicker";
import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import GradientPicker from "./GradientPicker";
import { FormatColorFill, Gradient } from "@mui/icons-material";
import { GradientOptions } from "@/lib/utils";

const MultiColourPicker = ({
  defaultColor,
  callback,
}: {
  defaultColor: string;
  callback: (newColor: string | GradientOptions) => void;
}) => {
  const [value, setValue] = useState<"solid" | "gradient">("solid");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, value) => {
          setValue(value);
        }}
        sx={{ "& > button": { padding: 0.5 } }}
      >
        <ToggleButton value="solid" title="Solid Colour" aria-label="solid">
          <FormatColorFill fontSize="small" />
        </ToggleButton>
        <ToggleButton value="gradient" title="Gradient" aria-label="gradient">
          <Gradient fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      {value === "solid" ? (
        <ColourPicker
          defaultColor={defaultColor}
          onChange={(color) => callback(color)}
        />
      ) : (
        <GradientPicker
          onChange={(gradientValue: GradientOptions) => callback(gradientValue)}
        />
      )}
    </Box>
  );
};

export default MultiColourPicker;

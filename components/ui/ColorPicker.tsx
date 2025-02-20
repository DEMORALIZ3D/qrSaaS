import { Box, Typography } from "@mui/material";
import { PopoverPicker } from "./PopoverPicker";

const ColourPicker = ({
  title,
  defaultColor,
  onChange,
}: {
  title: string;
  defaultColor: string;
  onChange: (newColor: string) => void;
}) => {
  return (
    <Box>
      <Typography variant="caption">{title}</Typography>
      <PopoverPicker
        defaultColor={defaultColor ?? "#fff"}
        onChange={onChange}
      />
    </Box>
  );
};

export default ColourPicker;

import {
  Button,
  ButtonProps,
  Typography,
  Icon as MuiIcon,
} from "@mui/material";
import React, { ElementType, ReactNode } from "react";

const ButtonGroupButton = ({
  icon: Icon,
  title,
  selected,
  ...props
}: {
  icon: ElementType;
  title?: string;
  selected?: boolean;
} & ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{ display: "flex", flexDirection: "column" }}
      variant={selected ? "contained" : "outlined"}
    >
      <Icon fontSize="small" />
      {title && (
        <Typography
          variant="caption"
          fontWeight="bold"
          sx={{
            lineHeight: 1.2,
            padding: 0,
            margin: 0,
            paddingTop: 0.5,
          }}
        >
          {title}
        </Typography>
      )}
    </Button>
  );
};

export default ButtonGroupButton;

import { Button, ButtonProps, Typography } from "@mui/material";
import { LucideProps } from "lucide-react";
import React from "react";

const ButtonGroupButton = ({
  icon: Icon,
  title,
  ...props
}: {
  icon: (props: LucideProps) => React.ReactNode;
  title?: string;
} & ButtonProps) => {
  return (
    <Button sx={{ display: "flex", flexDirection: "column" }} {...props}>
      <Icon size="20" />
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

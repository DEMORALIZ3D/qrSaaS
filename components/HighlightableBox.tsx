import { Box, styled } from "@mui/material";

const HighlightableBox = styled(Box, {
  shouldForwardProp: (pk) => pk !== "hovered" && pk !== "forward",
})<{ hovered?: boolean; forward?: boolean }>(({ theme, hovered, forward }) => ({
  "& > *": {
    cursor: "pointer",
  },
  ...(hovered && {
    ...(forward
      ? {
          "&>*:first-of-type": {
            border: "2px red solid",
          },
        }
      : { border: "2px red solid" }),
  }),
}));

export default HighlightableBox;
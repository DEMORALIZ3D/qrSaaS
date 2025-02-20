"use client";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#FFC0CB",
  //   },
  // },
  //  need to find out why dfault props is not working
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small", // Redundant, handled by InputBase, but good for explicitness.
      },
    },
  },
});

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

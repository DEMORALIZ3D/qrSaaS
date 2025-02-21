"use client";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";

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
        variant: "outlined",
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small", // Redundant, handled by InputBase, but good for explicitness.
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
        },
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

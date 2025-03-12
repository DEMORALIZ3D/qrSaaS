"use client";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121", // Almost Black/Dark Grey
      light: "#484848", // Medium Grey
      dark: "#000000", // Black
      contrastText: "#FFFFFF", // White
    },
    secondary: {
      main: "#FF4081", // Hot Pink
      light: "#FF79B0", // Softer Pink
      dark: "#C60055", // Deeper Magenta
      contrastText: "#FFFFFF", // White
    },
    background: {
      default: "#FFFFFF", // Default background to white (for most content areas)
      paper: "#FFFFFF", // Paper color (for cards, etc.)
    },
    text: {
      primary: "#212121", //Use primary.main for text
    },
  },
  typography: {
    fontFamily: [
      //Font stack
      "Bebas Neue", // Primary headline font
      "Open Sans", // Primary body font
      "Roboto", // Fallback to MUI default
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily: "Bebas Neue",
      fontWeight: 700, // Bold
      fontSize: "3.5rem", // Adjust as needed
      lineHeight: 1.2,
      letterSpacing: "0.05em",
      textTransform: "uppercase", // Make H1 uppercase
    },
    h2: {
      fontFamily: "Bebas Neue",
      fontWeight: 700,
      fontSize: "2.5rem", // Adjust as needed
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "Bebas Neue",
      fontWeight: 700,
      fontSize: "2rem",
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: "Bebas Neue",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "Open Sans", // Body text
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: "Open Sans", // Body text
      fontSize: "0.9rem",
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          background: "coral",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded corners
          textTransform: "none", // Prevent uppercase transformation on buttons
          fontWeight: 600, // Semi-bold buttons
          padding: "10px 24px", // Generous padding
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#000000", // Darker on hover
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#C60055", // Darker pink on hover
          },
        },
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
    MuiCard: {
      // Override Card styles
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded corners for cards
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
    },
    MuiInputBase: {
      //Consistent input fields
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FF4081",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          //Could add max width styling here
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

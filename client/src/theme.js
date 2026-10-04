import { createTheme, alpha } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#184132", // Deep Heritage Hunter Green
      light: "#265E4A",
      dark: "#0C261D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C47230", // Rich Warm Amber / Terracotta
      light: "#DC8945",
      dark: "#9E541B",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#E8B86D", // Rich Vintage Honey Gold
      light: "#F3CD8E",
      dark: "#C69344",
      contrastText: "#181B18",
    },
    background: {
      default: "#F3EBDD", // Rich warm oat/parchment tone (bolder & distinct from white)
      paper: "#FCFAF6",   // Warm soft ivory paper
    },
    text: {
      primary: "#181B18",
      secondary: "#545C55",
    },
    divider: "rgba(24, 65, 50, 0.12)",
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
      color: "#181B18",
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 700,
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
      color: "#181B18",
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
      color: "#181B18",
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      color: "#181B18",
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      lineHeight: 1.35,
      color: "#181B18",
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#181B18",
    },
    subtitle1: {
      fontSize: "1.05rem",
      fontWeight: 500,
      lineHeight: 1.5,
      color: "#545C55",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0.03em",
      textTransform: "uppercase",
    },
    body1: {
      fontSize: "0.975rem",
      lineHeight: 1.65,
      color: "#282E29",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#545C55",
    },
    button: {
      fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif',
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F3EBDD",
          color: "#181B18",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 22px",
          fontWeight: 600,
          transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 6px 20px -4px rgba(24, 65, 50, 0.25)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedPrimary: {
          backgroundColor: "#184132",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#265E4A",
          },
        },
        containedSecondary: {
          backgroundColor: "#C47230",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#A85B20",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          borderColor: "rgba(24, 65, 50, 0.25)",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: "#184132",
            backgroundColor: alpha("#184132", 0.05),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "#FCFAF6",
          border: "1px solid rgba(24, 65, 50, 0.1)",
          boxShadow: "0 4px 18px -2px rgba(24, 65, 50, 0.05)",
          transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 14px 30px -4px rgba(24, 65, 50, 0.12)",
            transform: "translateY(-3px)",
            borderColor: "rgba(24, 65, 50, 0.22)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation0: {
          backgroundColor: "#FCFAF6",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;

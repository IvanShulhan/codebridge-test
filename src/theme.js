import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: 'none',
  typography: {
    fontSize: 14,
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  palette: {
    background: {
      default: '#fff',
    },
  },
});

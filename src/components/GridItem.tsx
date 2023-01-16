import { Grid } from '@mui/material';

type Props = {
  children: React.ReactNode;
}

export const GridItem: React.FC<Props> = ({ children }) => (
  <Grid item xs={12} sm={6} md={4}> 
    {children}
  </Grid> 
);
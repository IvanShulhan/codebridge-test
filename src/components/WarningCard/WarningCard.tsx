import { Paper, Typography } from '@mui/material';
import styles from './WarningCard.module.scss';

export const WarningCard = () => (
  <Paper classes={{root: styles.paper}}>
    <Typography classes={{root: styles.title}}>
      Problem with fetching data...
    </Typography>
  </Paper>
)
import { Grid } from '@mui/material';
import Header from '../header/Header';

export const Body: React.FunctionComponent = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Header></Header>
      </Grid>
      <Grid size={4}>Hola 4</Grid>
      <Grid size={4}>Hola 4</Grid>
      <Grid size={8}>Hola 8</Grid>
    </Grid>
  );
};

export default Body;

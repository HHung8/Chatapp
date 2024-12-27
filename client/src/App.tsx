import { Grid } from '@mui/material';
import FullScreenLoader from './shared/FullScreenLoader';
import ResponsesiveChartDraw from './shared/ResponsesiveChartDraw';

function App() {
  return (
    <Grid container alignItems="center" flexDirection="row">
      <ResponsesiveChartDraw />
    </Grid>
  )
}

export default App

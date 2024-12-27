import { CircularProgress, Grid } from "@mui/material"

const FullScreenLoader = () => {
  return (
    <Grid container width="100%" height="100vh" justifyContent="center" alignItems="center">
        <CircularProgress />
    </Grid>
)
}

export default FullScreenLoader
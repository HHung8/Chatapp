import { Grid, Typography, useTheme } from "@mui/material"

const NotDataAvaliable = ({message}:{message?:string}) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent="center" alignItems="center">
        <Typography color={theme.palette.text.secondary}>
                {message ?? "No data availabel"}
        </Typography>
    </Grid> 
  )
}

export default NotDataAvaliable
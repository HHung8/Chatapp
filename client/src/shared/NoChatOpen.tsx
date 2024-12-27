import { useTheme } from "@emotion/react"
import { Grid, Paper, Typography } from "@mui/material";

const NoChatOpen = ({drawerWidth}:{drawerWidth:number}) => {
  const theme = useTheme();
  return (
    <Grid container sx={{ml:{sm:`${drawerWidth}`}}} height="100vh" justifyContent="center" alignItems="center">
        <Paper variant="elevation" sx={{p:5}}>
            <Typography color={theme.palette.text.secondary}>Click on  a chat to start</Typography>
        </Paper>
    </Grid> 
  )
}

export default NoChatOpen
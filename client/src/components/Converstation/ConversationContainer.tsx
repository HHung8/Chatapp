import { Grid, Toolbar } from "@mui/material"
import CustomAppBar from "../../Custom/CustomAppBar"
import MessageList from "../../Message/MessageList"
import SendMessageContainer from "../../Message/SendMessageContainer"
import { ConversationContainerProps } from "../../utils/type"

const ConversationContainer = ({drawerWidth}:ConversationContainerProps) => {
  return (
    <Grid container flexDirection="column" width="100%" sx={{ml:`${drawerWidth}px`}}>
        <CustomAppBar drawerWidth={drawerWidth} />
        <Toolbar />
        <MessageList />
        <SendMessageContainer />
    </Grid>
  );
};

export default ConversationContainer
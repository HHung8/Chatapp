import { Grid } from "@mui/material";
import { useConversationContext } from "../contexts/ConversationContext";
import MessageCard from "./MessageCard";

const MessageList = () => {
  const { allMessages } = useConversationContext();
  return (
    <Grid
      container
      height={`calc(100vh - 138px )`}
      sx={{ overflowY: "scroll", flexWrap: "nowrap" }}
      p={2}
      flexDirection="column"
      gap={1}
    >
      {allMessages &&
        Array.isArray(allMessages) &&
        allMessages?.length > 0 &&
        allMessages?.map((message) => <MessageCard message={message} />)}
    </Grid>
  );
};

export default MessageList;

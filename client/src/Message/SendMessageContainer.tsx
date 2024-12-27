import { Divider, Grid, IconButton, Popover, useTheme } from "@mui/material";
import CustomTextField from "../Custom/CustomTextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import OutboundIcon from "@mui/icons-material/Outbound";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import useMessage from "../hooks/useMessage";

const SendMessageContainer = () => {
  const theme = useTheme();
  const {messageBody,setMessageBody,handleSendMessage,openEmojiPickerEl,setOpenEmojiPickerEl} = useMessage();

  return (
    <>
      <Divider />
      <Grid item px={5} py={1} display="flex" alignItems="center" gap={2}>
        <CustomTextField
          value={messageBody?.body}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setMessageBody({body:event.target.value})
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if(event.key === "Enter" && ((messageBody?.body && messageBody?.body?.length > 0) || messageBody?.fileId)) {
            event.stopPropagation();
            handleSendMessage();
          }
          }}
          placeholder="Send Message"
          fullWidth
          multiline
          maxRows={2}
          size="small"
          InputProps={{
            startAdornment: (
              <IconButton sx={{ color: theme.palette.success.main }}>
                <AttachFileIcon />
              </IconButton>
            ),
            endAdornment: (
              <Grid item display="flex" alignItems="center" gap={1}>
                <IconButton
                  sx={{ color: theme.palette.warning.light }}
                  onClick={(
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    setOpenEmojiPickerEl(event.currentTarget);
                  }}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton sx={{ color: theme.palette.success.light }} onClick={handleSendMessage}>
                  <OutboundIcon />
                </IconButton>
              </Grid>
            ),
          }}
        />
      </Grid>
      {Boolean(openEmojiPickerEl) && (
        <Popover
          open={Boolean(openEmojiPickerEl)}
          onClose={() => {
            setOpenEmojiPickerEl(null);
          }}
          anchorEl={openEmojiPickerEl}
        >
            <EmojiPicker 
              data={data} 
              onEmojiSelect={(emojiData:EmojiData) => {
              console.log(emojiData)
              setMessageBody((prev) => ({
                ...prev, 
                body:`${prev?.body} ${emojiData?.native}`
              }))
            }}/>
        </Popover>
      )}
    </>
  );
};

export default SendMessageContainer;

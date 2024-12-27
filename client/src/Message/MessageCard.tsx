import { Avatar, Grid, IconButton, MenuItem, Popover, Typography, useTheme } from "@mui/material";
import { MessageCardProps } from "../utils/type";
import stringAvatar from "../utils/stringAvatar";
import { useAuthContext } from "../contexts/AuthContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { useState } from "react";
import useMessage from "../hooks/useMessage";

const MessageCard = ({ message }: MessageCardProps) => {
  const theme = useTheme();
  const {loggedInUser} = useAuthContext();
  const {handleDeleteMessage} = useMessage();
  const [messageCardAnchorEl, setMessageCardAnchorEl] = useState<HTMLElement | null>(null);
  
  return (
    <>
        <Grid
        p={1}
        item
        display="flex"
        alignItems="center"
        gap={2}
        max-width={"35%"}
        alignSelf={message?.sender?.userId === loggedInUser?.user?.id ? "flex-end" : "flex-start"}
        flexDirection={message?.sender?.userId === loggedInUser?.user?.id ? 'row-reverse' : 'row'}
        >
        <Avatar 
            src={message?.sender?.user?.imageUrl ?? ""}
            {...(message?.sender?.user?.imageUrl
            ? {}
            : stringAvatar(message?.sender?.user?.name))}
        />
        <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            sx={{
                bgcolor:
                message?.sender?.userId === loggedInUser?.user?.id
                ? theme.palette.primary.main
                : theme.palette.grey[900],
                borderRadius: 4,
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs zeroMinWidth width="100%">
                    <Grid container spacing={2}>
                        <Grid item zeroMinWidth width="100%">
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs zeroMinWidth>
                                    <Typography color={theme.palette.text.primary}>
                                            {message?.body}
                                    </Typography>
                                </Grid>
                                {message?.sender?.userId === loggedInUser?.user?.id && 
                                <Grid item alignSelf="flex-start">
                                    <IconButton 
                                        sx={{color:theme.palette.common.white}} 
                                        onClick={(event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                            setMessageCardAnchorEl(event.currentTarget)
                                        }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>    
                                </Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                <Typography variant="caption" color={theme.palette.text.primary}>
                    {dayjs(message?.createdAt).format("MMM DD, YYYY h:mm A")}
                </Typography>
                <DoneAllIcon sx={{width: 16, height: 16, color: theme.palette.text.primary}} />
            </Grid>
        </Grid>
        </Grid>
        {Boolean(messageCardAnchorEl) && (
            <Popover 
                open={Boolean(messageCardAnchorEl)} 
                anchorEl={messageCardAnchorEl} 
                anchorOrigin={{vertical:"bottom", horizontal:"center"}}
                onClose={() => {
                    setMessageCardAnchorEl(null);
                }}
            >
                <MenuItem>
                    <Grid
                        item 
                        display="flex"
                        alignItems="center"
                        gap={1}
                        onClick={() => {handleDeleteMessage(message)}}
                    >
                        <IconButton disableRipple>
                            <DeleteIcon color="error" />
                        </IconButton>
                        <Typography color={theme.palette.text.secondary}>
                            Delete
                        </Typography>
                    </Grid>
                </MenuItem>
            </Popover>
        ) }
    </>
    
  );
};
export default MessageCard;

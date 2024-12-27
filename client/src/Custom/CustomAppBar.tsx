import { AppBar, Avatar, Grid, IconButton, MenuItem, Popover, Toolbar, Typography, useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { CustomAppBarProps, Member } from '../utils/type';
import { useConversationContext } from '../contexts/ConversationContext';
import { useAuthContext } from '../contexts/AuthContext';
import stringAvatar from '../utils/stringAvatar';

const CustomAppBar = ({drawerWidth}: CustomAppBarProps) => {
 const theme = useTheme();
 
 const {currentConversation, handleGoToHome, setChatMenuAnchorEl, chatMenuAnchorEl, handleDeleteConversation} = useConversationContext();
 const {loggedInUser} = useAuthContext();
 const notCurrentMember = currentConversation?.members?.find((member:Member) => member?.userId !== loggedInUser?.user?.id);
 const conversationTitle = currentConversation?.type === "DIRECT_MESSAGE" ? notCurrentMember?.user?.name : currentConversation?.groupTitle;
 const conversationImageUrl = currentConversation?.type === "DIRECT_MESSAGE" ? notCurrentMember?.user?.imageUrl : "";

  return (
    <>
      <AppBar position='fixed' color='transparent' sx={{width:`calc(100% - ${drawerWidth}px)`}}>
        <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item display="flex" gap={1} alignItems="center">
                    <Avatar
                        src={conversationImageUrl ?? ""} 
                        {...(conversationTitle && !conversationImageUrl?.trim()?.length 
                        ? stringAvatar(conversationTitle) 
                        : {})} 
                    />
                    <Grid item>
                        <Typography color={theme.palette.text.secondary}>
                            {conversationTitle ?? ""}
                        </Typography>
                        <Typography variant='caption' color={theme.palette.text.secondary}>
                            Online 
                        </Typography>
                    </Grid>
                    
                </Grid>
                <IconButton sx={{color:theme.palette.text.secondary}} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    setChatMenuAnchorEl(event.currentTarget)
                }}>
                    <MoreVertIcon />
                </IconButton>
            </Grid>
        </Toolbar>
      </AppBar>
      {Boolean(chatMenuAnchorEl) && 
      <Popover 
        open={Boolean(chatMenuAnchorEl)}
        onClose={() => {setChatMenuAnchorEl(null)}}
        anchorEl={chatMenuAnchorEl}
        anchorOrigin={{vertical: 'bottom', horizontal: "left"}}
       >
            <MenuItem onClick={handleGoToHome}>
                <Grid item display="flex" alignItems="center" gap={1}>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                    <Typography color={theme.palette.text.secondary}>Close</Typography>
                </Grid>
            </MenuItem>
            <MenuItem onClick={() => {handleDeleteConversation()}}>
                <Grid item display="flex" alignItems="center" gap={1}>
                    <IconButton>
                        <DeleteIcon color='error' />
                    </IconButton>
                    <Typography color={theme.palette.text.secondary}>Delete</Typography>
                </Grid>
            </MenuItem>
        </Popover>}
    </>
  )
}

export default CustomAppBar
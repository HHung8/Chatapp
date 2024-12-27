import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import React, { useState } from 'react'
import StartConversationModal from '../Converstation/StartConversationModal';
import { useConversationContext } from '../../contexts/ConversationContext';

const ChartListHeading = () => { 
  const theme = useTheme();
  const {
        addChatAnchorEl, 
        setAddChatAnchorEl,
        setOpenCreateConversationModal, 
        openCreateConversationModal
   } = useConversationContext();
    
  return (
    <>
        <ListItem>
                <ListItemText primaryTypographyProps={{variant: 'h5', color:theme.palette.text.secondary}}>
                    Charts
                </ListItemText>
                <ListItemIcon >
                    <IconButton sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white
                    }}
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        setAddChatAnchorEl(event.currentTarget);
                    }}
                    disableRipple
                    >
                        <AddIcon />
                    </IconButton>
                </ListItemIcon>
        </ListItem>
        {Boolean(addChatAnchorEl) && <Popover open={Boolean(addChatAnchorEl)} onClose={() => setAddChatAnchorEl(null)} anchorEl={addChatAnchorEl} anchorOrigin={{vertical: 'bottom', horizontal:'center'}}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => {
                    setOpenCreateConversationModal({isOpen:true,type:"DIRECT_MESSAGE"})
                }}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: theme.palette.text.secondary}}>
                        New Chat
                    </ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding> 
                <ListItemButton onClick={() => {
                    setOpenCreateConversationModal({isOpen:true, type:'GROUP'})
                }}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: theme.palette.text.secondary}}>
                        New Group
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </Popover>
        }
        {openCreateConversationModal && 
        <StartConversationModal 
            open={openCreateConversationModal?.isOpen} 
            onClose={() => {
                setOpenCreateConversationModal({
                    isOpen: false,
                    type: "DIRECT_MESSAGE"
             });
            }}
            type={openCreateConversationModal?.type}
        />}
    </>
  )
}

export default ChartListHeading
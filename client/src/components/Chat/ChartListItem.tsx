import { Avatar, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react'
import { ChatListItemProps, Member } from '../../utils/type';
import { useAuthContext } from '../../contexts/AuthContext';
import stringAvatar from '../../utils/stringAvatar';
import { useNavigate } from 'react-router-dom';

const ChartListItem = ({conversation}:ChatListItemProps) => { 
  const {loggedInUser} = useAuthContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const notCurrentMember = conversation?.members?.find((member:Member) => member?.userId !== loggedInUser?.user?.id);
  const conversationTitle = conversation?.type === "DIRECT_MESSAGE" ? notCurrentMember?.user?.name : conversation?.groupTitle;
  const conversationImageUrl = conversation?.type === "DIRECT_MESSAGE" ? notCurrentMember?.user?.imageUrl : "";

  return (
    <ListItem disablePadding sx={{bgcolor:theme.palette.divider, mt:1}}>
        <ListItemButton 
                selected={true} 
                sx={{"&.Mui-selected":
                {bgcolor:theme.palette.primary.main, color:theme.palette.common.white}}}
                disableRipple
                disableTouchRipple
                focusRipple={false}
                onClick={() => {
                    navigate(`/chart/${conversation?.id}`, {state: conversation})
                }}
            >
            <ListItemIcon>
                <Avatar 
                    src={conversationImageUrl ?? ""} 
                    {...(conversationTitle && !conversationImageUrl?.trim()?.length 
                    ? stringAvatar(conversationTitle) 
                    : {})} 
                />
            </ListItemIcon>
            <Grid container flexDirection="column">
                <ListItemText primaryTypographyProps={{variant: 'body1', color:theme.palette.text.primary}}>
                    {conversationTitle ?? ""}
                </ListItemText>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}

export default ChartListItem
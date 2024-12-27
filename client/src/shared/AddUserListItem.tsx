import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddUserListItemProps} from '../utils/type';
import stringAvatar from '../utils/stringAvatar';

const AddUserListItem = ({user, type, selectedUsers, setSelectedUsers}:AddUserListItemProps) => {
    const theme = useTheme();
    const isCurrentUserSelected = selectedUsers?.find((u) => u?.id === user?.id);
    function handleSelectedUser () {
        if(type === "DIRECT_MESSAGE") {
            setSelectedUsers([user]);
        };
        if(type === "GROUP") {
            setSelectedUsers((prevUsers) => {
                if(isCurrentUserSelected) {
                    return prevUsers?.filter((u) => u?.id !== user?.id);
                }
                return [...prevUsers, user];
            });
        }
    }
    return (
    <ListItem 
        sx={{
            color:theme.palette.common.white, 
            bgcolor:selectedUsers?.find((u) => u?.id === user?.id) 
                ? theme.palette.primary.main 
                : theme.palette.divider, 
            borderRadius: 4,
        }}>

        <ListItemButton 
            sx={{borderRadius:4}}
            selected={!!isCurrentUserSelected}
            onClick={handleSelectedUser}
        >   
                
            <ListItemIcon>
                <Avatar 
                    sx={{color:theme.palette.text.secondary}} 
                    src={user?.imageUrl ?? ""}
                    {...(user?.imageUrl ? null : {...stringAvatar(user?.name)})}
                />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{color: theme.palette.text.secondary, variant:'h6'}}>{user?.name}</ListItemText>
            <ListItemIcon 
                sx={{
                    color: isCurrentUserSelected 
                        ? theme.palette.common.white
                        :theme.palette.primary.main
                }}>
                {isCurrentUserSelected ? <CheckCircleIcon /> : <AddCircleIcon />}
            </ListItemIcon>
        </ListItemButton>
    </ListItem>
  )
}

export default AddUserListItem
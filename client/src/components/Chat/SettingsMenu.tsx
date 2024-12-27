import React from 'react'
import { SettingsMenuProps } from '../../utils/type'
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, useTheme } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useThemeContext } from '../../contexts/ThemeContextProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';

const SettingsMenu = ({settingsAnchorEl,setSettingsAnchorEl}:SettingsMenuProps) => {
    const {mode, handleSetTheme} = useThemeContext();
    const theme = useTheme();
    const {logout} = useAuth();
    if(settingsAnchorEl) {
        return (
            <Popover 
                open={Boolean(settingsAnchorEl)} 
                onClose={() => setSettingsAnchorEl(null)}
                anchorEl={settingsAnchorEl} 
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {handleSetTheme(mode === 'light' ? 'dark' : 'light')}}>
                        <ListItemIcon>
                            {mode === "light" ? <DarkModeIcon/> : <ContrastIcon />}
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{color:theme.palette.text.secondary}}>Switch to {mode === 'light' ? 'dark' : 'light'} mode</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {logout()}}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{color:theme.palette.text.secondary}}>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </Popover>
          );
    }
  return null;
}

export default SettingsMenu
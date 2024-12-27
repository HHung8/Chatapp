import { useState } from 'react';
import { Grid, IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsMenu from './SettingsMenu';
import { useConversationContext } from '../../contexts/ConversationContext';
import { useAuthContext } from '../../contexts/AuthContext';
const ChartListHeader = () => {
    const theme = useTheme();
    const {handleGoToHome} = useConversationContext();
    const {loggedInUser} = useAuthContext();
    const [settingsMenuAnchorEl, setSettingsMenuAnchorEl] = useState<HTMLElement | null>(null);
    return <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
            <Tooltip title={loggedInUser?.user?.name ?? ""} placement='bottom' arrow>
                <Typography variant='h5' maxWidth="65%" noWrap color={theme.palette.text.secondary}>
                    {loggedInUser?.user?.name ?? ""}
                </Typography>
            </Tooltip>
            <Grid item display="flex" alignItems="center" gap={1}>
                <IconButton 
                    disableRipple 
                    sx={{bgcolor: theme.palette.primary.main, color:theme.palette.common.white}}
                    onClick={handleGoToHome}
                >
                    <HomeIcon/>
                </IconButton>
                <IconButton
                    disableRipple
                    sx={{bgcolor: theme.palette.primary.main, color:theme.palette.common.white}}
                    onClick={(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        setSettingsMenuAnchorEl(event.currentTarget);
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </Grid>
        </Grid>
        <SettingsMenu 
            settingsAnchorEl={settingsMenuAnchorEl} 
            setSettingsAnchorEl={setSettingsMenuAnchorEl} 
        />
    </Toolbar>
};

export default ChartListHeader;
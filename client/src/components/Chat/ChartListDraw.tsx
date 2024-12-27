import { Divider, Drawer, Grid, List } from '@mui/material'
import ChartListHeader from './ChatListHeader';
import SearchChartListItem from './SearchChartListItem';
import ChartListHeading from './ChartListHeading';
import ChartListItems from './ChartListItems';
import { ChatListDrawerProps } from '../../utils/type';

const ChartListDraw = ({conversations,drawerWidth}:ChatListDrawerProps) => {
  return (
   <Grid sx={{width: {sm:drawerWidth}}}>
        <Drawer variant='permanent' sx={{"& .MuiDrawer-paper": {boxSizing:'border-box', width:drawerWidth}}} open>
            <ChartListHeader />
            <Divider />
            <List>
                <SearchChartListItem />
                <Divider />
                <ChartListHeading />
                <ChartListItems conversations={conversations} />
            </List>
        </Drawer>
   </Grid>
  )
}

export default ChartListDraw
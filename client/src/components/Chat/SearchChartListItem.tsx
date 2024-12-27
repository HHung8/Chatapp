import { IconButton, ListItem, useTheme} from "@mui/material"
import CustomTextField from "../../Custom/CustomTextField"
import SearchIcon from '@mui/icons-material/Search';
import { useConversationContext } from "../../contexts/ConversationContext";

const SearchChartListItem = () => {
  const theme = useTheme();
  const {searchConversationValue, setSearchConversationValue} = useConversationContext()
  return (
    <ListItem>
        <CustomTextField 
            placeholder="Search Chart"
            size="small"
            variant="outlined"
            fullWidth 
            value={searchConversationValue}
            onChange={(event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setSearchConversationValue(event.target.value)
            }}
            InputProps={{endAdornment:(
            <IconButton sx={{color:theme.palette.primary.main}}>
              <SearchIcon />
            </IconButton>
        )}}/>
    </ListItem>
  )
}

export default SearchChartListItem
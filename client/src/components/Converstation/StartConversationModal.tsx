import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useTheme,
} from "@mui/material";
import CustomButton from "../../Custom/CustomButton";
import CustomTextField from "../../Custom/CustomTextField";
import AddUserListItem from "../../shared/AddUserListItem";
import { useConversationContext } from "../../contexts/ConversationContext";
import { StartConversationModalProps, User } from "../../utils/type";
import NotDataAvaliable from "../../shared/NotDataAvaliable";

const StartConversationModal = ({ open, onClose, type }:StartConversationModalProps) => {
  const theme = useTheme();
  const {
    allUsers, 
    searchUserValue, 
    handleSearchUserChange, 
    selectedUserForConversation, 
    setSelectedUserForConversation,
    handleCreateConversation,
    groupTitle,
    setGroupTitle,
  } = useConversationContext();

  const renderUsers = (usersList:User[]) => {
    return usersList?.map((user:User) => 
      (<AddUserListItem 
        key={user?.id} 
        user={user} 
        selectedUsers={selectedUserForConversation} 
        setSelectedUsers={setSelectedUserForConversation} 
        type={type}
      />
      ))
  };
  
  function handleClose() {
    onClose();
    setSelectedUserForConversation([]);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle color={theme.palette.text.secondary}>
        Select users to start a conversation
      </DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2} sx={{ width: "600px" }}>
          <CustomTextField
            size="small"
            placeholder="Search users to start conversation"
            variant="outlined"
            value={searchUserValue}
            onChange={handleSearchUserChange}
          />
          {type === "GROUP" && (
            <CustomTextField
              size="small"
              required
              label="Group Title"
              placeholder="Please enter a group title"
              variant="outlined"
              value={groupTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  setGroupTitle(event.target.value);
              }}  
            />
          )}
          <Grid
            item
            display="flex"
            flexDirection="column"
            gap={1}
            maxHeight="300px"
            sx={{ overflowY: "scroll" }}
          >
          {allUsers && Array.isArray(allUsers) && 
            allUsers?.length > 0 
            ? renderUsers(allUsers) 
            : <NotDataAvaliable message="No user found" />
          }
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton sx={{color:theme.palette.primary.main}} variant="text" onClick={handleClose}>Close</CustomButton>
        <CustomButton  
          disabled={type === "GROUP" ? !groupTitle || !groupTitle?.trim()?.length || !selectedUserForConversation?.length : !selectedUserForConversation?.length}
          disableRipple 
          sx={{bgcolor: theme.palette.primary.main}}  
          variant="contained" 
          onClick={handleCreateConversation}>
             Create
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartConversationModal;

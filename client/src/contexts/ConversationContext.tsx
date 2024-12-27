import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Conversation, ConversationContextType, Message, User } from "../utils/type";
import { getAllUsers } from "../api/usersApiHandlers";
import { useDebounce } from "../hooks/useDebounce";
import { useAuthContext } from "./AuthContext";
import { createConversation, deleteConversation, getConversation } from "../api/conversationApiHandler";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMessage } from "../api/messageApiHandler";
import { useSocketContext } from "./SocketContextProvider";

export const ConversationContext = createContext<ConversationContextType>({});

export default function ConversationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const {socket} = useSocketContext();

  const { loggedInUser } = useAuthContext();
  const [addChatAnchorEl, setAddChatAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [openCreateConversationModal, setOpenCreateConversationModal] =
    useState<{ isOpen: boolean; type: "DIRECT_MESSAGE" | "GROUP" }>({
      isOpen: false,
      type: "DIRECT_MESSAGE",
    });

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchUserValue, setSearchUserValue] = useState<string>("");
  const [selectedUserForConversation, setSelectedUserForConversation] =
    useState<User[]>(() =>
      loggedInUser?.isAuthenticated && loggedInUser?.user
        ? [loggedInUser?.user]
        : []
    );
  const [groupTitle, setGroupTitle] = useState<string>("");
  const [searchConversationValue, setSearchConversationValue] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([])
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState<HTMLElement | null>(null);
  const handleGetConversation = useCallback(async(searchValue?:string) => {
    try {
      const response = await getConversation(searchValue);
      if(response) {
        setConversations(response ?? []);
      } else {
        setConversations([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ?? "Failed to fetch conversations please try again",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff"
          }
        }
      )
    }
  },[])

  const handleGetUsers = useCallback(async (searchUserValue?: string) => {
    const users = await getAllUsers(searchUserValue);
    if (users && Array.isArray(users) && users?.length > 0) {
      setAllUsers(users);
    } else {
      setAllUsers([]);
    }
  }, []);
  function handleSearchUserChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchUserValue(event.target.value);
  }

async function handleCreateConversation() {
    try {
      await createConversation({
        members: [
          ...selectedUserForConversation,
          {
            email: loggedInUser?.user?.email as string,
            id: loggedInUser?.user?.id as string,
            imageUrl: loggedInUser?.user?.imageUrl as string,
            name: loggedInUser?.user?.name as string,
          },
        ],
        type: openCreateConversationModal?.type,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.toString() ?? "Failed to create the conversation please try again later",
        {style:{borderRadius: '10px', background:"#333", color:"#FFF"}},
      )
    }
    setOpenCreateConversationModal({isOpen:false, type:"DIRECT_MESSAGE"});
    setAddChatAnchorEl(null);
    setSelectedUserForConversation([]);
    setGroupTitle("");
  }

  function handleGoToHome() {
    if(socket && currentConversation?.id) {
      socket.emit("leaveConversation", currentConversation?.id);
    }
    setCurrentConversation(null);
    navigate('/')
  }

  async function handleDeleteConversation() {
    try {
        const response = await deleteConversation(currentConversation?.id as string);
        if(response) {
          setChatMenuAnchorEl(null);
          handleGoToHome();
        }
    } catch (error) {
        console.log(error);
        toast.error(
          error?.toString() ?? "Failed to delete conversation please try again",
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color:"#fff"
            }
          }
        )
    }
  }

  const debouncedSearchUser = useDebounce(handleGetUsers, 500);
  const debouncedSearchChat = useDebounce(handleGetConversation, 500);
  
  useEffect(() => {
    if(loggedInUser && loggedInUser?.isAuthenticated && loggedInUser?.user?.id) {
        if(searchConversationValue) {
          debouncedSearchChat(searchConversationValue)
        } else { 
          handleGetConversation()
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchConversationValue, loggedInUser, handleGetConversation])

  useEffect(() => {
    if (openCreateConversationModal?.isOpen) {
      if (searchUserValue) {
        debouncedSearchUser(searchUserValue);
      } else {
        handleGetUsers();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateConversationModal, searchUserValue, handleGetUsers]);

  const handleGetMessage = useCallback(async(conversationId:string) => {
     const response = await getMessage(conversationId)
     if(response) {
        setAllMessages(response ?? [])
     } else {
        setAllMessages([]);
     }
  },[])

  useEffect(() => {
    if(currentConversation && currentConversation?.id) {
      handleGetMessage(currentConversation?.id)
    }
  },[currentConversation, handleGetMessage])

  useEffect(() => {
    if(currentConversation?.id){
      socket.emit("joinConversation", currentConversation?.id);
    }
  },[socket, currentConversation?.id]);

  useEffect(() => {
    if(socket) {
      socket.on("newConversation", (data:Conversation) => {
          setConversations((prev) => [data,...prev]);
      });
      socket.on("deleteConversation", (deleteConversationId:string) => {
        setConversations(prev => {
          const filteredConversations = prev?.filter(conversation => conversation?.id !== deleteConversationId)
          return filteredConversations;
        });
    });
    socket.on("newMessage", (newMessage:Message) => {
      setAllMessages((prev) => {
       if(prev?.find(msg=>msg?.id === newMessage?.id)) {
        return prev;
       } else {
        return [...prev, newMessage]
       }
       });
    });
      return () => {
        socket.off("newConversation", () => {
          setConversations([]);
        });
        socket.off("deletedConversation", () => {
          setConversations([]);
        })
        socket.off("newMessage", () => {
          setAllMessages([]);
        })
      }
    }
  },[socket])

  return (
    <ConversationContext.Provider
      value={{
        addChatAnchorEl,
        setAddChatAnchorEl,
        setOpenCreateConversationModal,
        openCreateConversationModal,
        selectedUserForConversation,
        handleSearchUserChange,
        setSelectedUserForConversation,
        allUsers,
        handleCreateConversation,
        groupTitle,
        setGroupTitle,
        setSearchConversationValue,
        searchConversationValue,
        conversations,
        currentConversation,
        setCurrentConversation,
        handleGoToHome,
        allMessages,
        handleDeleteConversation,
        chatMenuAnchorEl, 
        setChatMenuAnchorEl
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

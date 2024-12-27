import { useState } from "react";
import { Message, MessageBody } from "../utils/type";
import { deleteMessage, sendMessage } from "../api/messageApiHandler";
import { useConversationContext } from "../contexts/ConversationContext";
import { useAuthContext } from '../contexts/AuthContext';

export default function useMessage() {
    const {currentConversation} = useConversationContext();
    const {loggedInUser} = useAuthContext();
    const [openEmojiPickerEl, setOpenEmojiPickerEl] = useState<HTMLElement | null>(null);
    const [messageBody, setMessageBody] = useState<MessageBody>({body:"", fileId:null, fileUrl:null});

    function handleResetMessage() {
        setMessageBody({body:"", fileId:null, fileUrl:null})       
    }
    
    async function handleSendMessage() {
        const senderId = currentConversation?.members?.find((member) => member?.userId === loggedInUser?.user?.id)?.id as string;
        await sendMessage({conversationId:currentConversation?.id as string, messageBody, senderId});
        handleResetMessage();
    }
    
    async function handleDeleteMessage(message:Message) {
        await deleteMessage({message})
    }

    return {messageBody, setMessageBody, handleSendMessage,openEmojiPickerEl,setOpenEmojiPickerEl,handleDeleteMessage};
}
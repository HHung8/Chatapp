import { Message } from './../utils/type';
import { SERVER_ENDPOINTS } from "../utils/contants";
import authFetchHandler from "./authFetchHandler";

export const sendMessage = async ({
  conversationId,
  messageBody,
  senderId,
}: {
  conversationId: string;
  messageBody: {
    body?: string | null;
    flexId?: string | null;
    fileUrl?: string | null;
  };
  senderId:string;
}) => {
  const response = await authFetchHandler({
    endPoint: SERVER_ENDPOINTS.MESSAGE.CREATE,
    method: "POST",
    data: { conversationId, senderId, messageBody },
  });
  return response?.data;
};

export const getMessage = async(conversationId:string) => {
    const response = await authFetchHandler({endPoint: SERVER_ENDPOINTS.MESSAGE.GET, method:"GET", data:{conversationId}});
    return response?.data ?? []
}

export const deleteMessage = async({message}:{message:Message}) => {
    const response = await authFetchHandler({
        endPoint: SERVER_ENDPOINTS.MESSAGE.DELETE,
        method:"DELETE",
        data:{message},
    });
    return response?.data;
}
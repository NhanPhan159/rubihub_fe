import {
  PaginationResult,
  PrivateChat,
  PrivateChatRequest,
  PrivateChatResponse,
  PublicChatRequest,
  PublicChatResponse,
} from "../types";
import { axiosClient } from "../utils";
import { PAGE_SIZE } from "../constants";

export const publicChat = async ({
  message,
}: PublicChatRequest): Promise<PublicChatResponse> => {
  const { data } = await axiosClient.post<PublicChatResponse>("chats/public", {
    message,
  });

  return data;
};

export const privateChat = async ({
  chatData,
  userId,
}: PrivateChatRequest): Promise<PrivateChatResponse> => {
  const { data } = await axiosClient.post<PrivateChatResponse>("chats/private", {
    chatData,
    userId,
  });

  return data;
};

export const fetchChatsByConversation = async (
  page: number,
  conversationId?: string,
): Promise<PaginationResult<PrivateChat>> => {
  const { data } = await axiosClient.get<PaginationResult<PrivateChat>>(
    "chats",
    { params: { conversationId, page: page, limit: PAGE_SIZE } },
  );

  return data;
};

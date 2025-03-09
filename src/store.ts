import { create } from "zustand";

import { Theme } from "./enums";
import { Conversation, UserDetails } from "./types";
import { fetchCurrentUser, fetchConversation, updateConversationName, deleteConversation } from "./api";

type StateValue = {
  theme: Theme;
  isGameModal: boolean;
  currentUser: UserDetails | null;
  conversations: Conversation[];
};

type Action = {
  setTheme: (theme: Theme) => void;
  fetchCurrentUser: () => Promise<void>;
  fetchConversations: () => Promise<Conversation[]>;
  updateConversationName: (conversationId: string, name: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  clearStore: () => void;
  setIsGameModal: (value: boolean) => void 
};

type Store = {
  value: StateValue;
  actions: Action;
};

const initialStateValue: StateValue = {
  theme: Theme.SYSTEM,
  currentUser: null,
  conversations: [],
  isGameModal: false,
};

const useStore = create<Store>((set) => ({
  value: initialStateValue,
  actions: {
    setTheme: (theme: Theme) =>
      set((state) => ({ value: { ...state.value, theme } })),
    fetchCurrentUser: async () => {
      const currentUser = await fetchCurrentUser();

      set((state) => ({ value: { ...state.value, currentUser } }));
    },
    fetchConversations: async () => {
      const conversations = await fetchConversation();

      set((state) => ({ value: { ...state.value, conversations } }));

      return conversations;
    },
    updateConversationName: async (conversationId, name) => {
      const updatedConversation = await updateConversationName(conversationId, name);

      set((state) => ({
        value: {
          ...state.value,
          conversations: state.value.conversations.map((conversation) =>
            conversation._id === updatedConversation._id ? updatedConversation : conversation,
          ),
        },
      }));
    },
    deleteConversation: async (conversationId) => {
      await deleteConversation(conversationId);

      set((state) => ({
        value: {
          ...state.value,
          conversations: state.value.conversations.filter(
            (conversation) => conversation._id !== conversationId,
          ),
        },
      }));
    },
    clearStore: () => set({ value: initialStateValue }),
    setIsGameModal: (data: boolean) => {
      set((state)=>({value : {...state.value,isGameModal:data}}))
    }
  },
}));

export const useGlobalStore = useStore;

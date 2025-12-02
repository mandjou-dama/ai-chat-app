// chatsStore.ts
import { create } from "zustand";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: number;
};

type Chat = {
  id: string;
  pinned?: boolean;
  title: string;
  messages: Message[];
};

type ChatsStore = {
  chats: Chat[];
  createChat: () => string;
  addMessage: (chatId: string, message: Message) => void;
};

export const useChatsStore = create<ChatsStore>((set) => ({
  chats: [
    {
      id: "1",
      title: "How do I improve performance in React Native?",
      pinned: true,
      messages: [
        {
          id: "m1",
          role: "user",
          text: "Hey! How do I improve performance in React Native?",
          createdAt: Date.now() - 100000,
        },
        {
          id: "m2",
          role: "assistant",
          text: "You can optimize by reducing re-renders, using FlashList, avoiding anonymous functions, and enabling Hermes.",
          createdAt: Date.now() - 90000,
        },
      ],
    },

    {
      id: "2",
      title: "Why One Punch Man Saison 3 animations are so bad?",
      pinned: true,
      messages: [
        {
          id: "m3",
          role: "user",
          text: "Why One Punch Man Saison 3 animations are so bad?",
          createdAt: Date.now() - 500000,
        },
        {
          id: "m4",
          role: "assistant",
          text: "One Punch Man Saison 3 animations are so bad because the characters are too big and the actions are too fast. It's like watching a movie with a super hero and a super villain, but the villain is way bigger and the actions are way faster than in a real movie.",
          createdAt: Date.now() - 480000,
        },
        {
          id: "m5",
          role: "user",
          text: "Sounds nice! When is the best time to go?",
          createdAt: Date.now() - 450000,
        },
        {
          id: "m6",
          role: "assistant",
          text: "Between June and October — dry season, perfect weather.",
          createdAt: Date.now() - 440000,
        },
      ],
    },

    {
      id: "3",
      title: "Create a simple workout plan for me.",
      messages: [
        {
          id: "m7",
          role: "user",
          text: "Create a simple workout plan for me.",
          createdAt: Date.now() - 200000,
        },
        {
          id: "m8",
          role: "assistant",
          text: "Sure! Start with pushups (3x12), squats (3x15), planks (3x45s), and a 10-minute jog.",
          createdAt: Date.now() - 180000,
        },
      ],
    },
    {
      id: "4",
      title: "Milestone payment proposal for client project",
      messages: [
        {
          id: "m7",
          role: "user",
          text: "eeking an experienced React Native (Expo) developer to build the MVP for GoLocal, a mobile app focused on discovering local events and activities. ",
          createdAt: Date.now() - 200000,
        },
        {
          id: "m8",
          role: "assistant",
          text: "Here are clear, professional milestone descriptions you can send on Upwork, including deliverables, due dates, and suggested amounts.",
          createdAt: Date.now() - 180000,
        },
      ],
    },
  ],

  createChat: () => {
    const id = String(Date.now());

    set((state: any) => ({
      chats: [
        {
          id,
          title: "New Chat",
          messages: [],
        },
        ...state.chats,
      ],
    }));

    return id;
  },

  addMessage: (chatId: string, message: any) => {
    set((state: any) => ({
      chats: state.chats.map((chat: any) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    }));
  },
}));

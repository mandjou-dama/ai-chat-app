export default [
  {
    id: "1",
    title: "React Native Help",
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
    title: "Travel Advice",
    messages: [
      {
        id: "m3",
        role: "user",
        text: "Where should I travel next?",
        createdAt: Date.now() - 500000,
      },
      {
        id: "m4",
        role: "assistant",
        text: "You should visit Zanzibar — peaceful beaches, amazing food, and a great cultural mix.",
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
    title: "Fitness Plan",
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
];

import { useChatStore } from "src/stores/chat";

export function receiverHasChat(receiver) {
  const chatStore = useChatStore();
  const receiverChat = chatStore.myChats.find(
    (chat) => chat?.receiver?._id === receiver._id
  );

  if (!receiverChat) return false;

  return receiverChat;
}

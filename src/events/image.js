import { useMessageStore } from "src/stores/messages";
import { useChatStore } from "src/stores/chat";
import { reverseRoles } from "src/composables/reverseRoles";

export function imageEvents(socket) {
  let messagesStore;
  let chatStore;

  socket.on("server:new-chat-id-to-image-message", (newChat, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    if (!chatStore) chatStore = useChatStore();

    console.log("ejecutado");

    const chat = reverseRoles(newChat);
    messagesStore.setAllIndexedChatMessages(newChat._id, [msg]);
    chatStore.setNewChat(chat);
    chatStore.setChatSelect(chat.receiver, newChat);
    messagesStore.changeMessageStatus(chat._id);
  });
}

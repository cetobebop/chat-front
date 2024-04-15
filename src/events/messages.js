import { useMessageStore } from "src/stores/messages";

export function messagesEvents(socket) {
  let messagesStore;

  socket.on("server:new-message", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    console.log("chat existente, mensaje nuevo ", msg.content);
    messagesStore.setAllIndexedChatMessages(chatId, msg);
  });

  socket.on("server:new-room-new-message", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    console.log("chat nuevo, mensaje nuevo ", msg.content);
    messagesStore.setAllIndexedChatMessages(chatId, [msg]);
  });

  socket.on("server:get-chat-messages", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    messagesStore.setAllIndexedChatMessages(chatId, msg);
  });
}

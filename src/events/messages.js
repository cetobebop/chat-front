import { useMessageStore } from "src/stores/messages";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";

export function messagesEvents(socket) {
  let messagesStore;
  let unreadMessagesStore;

  socket.on("server:new-message", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    if (!unreadMessagesStore) unreadMessagesStore = useUnreadMessagesStore();

    messagesStore.receivedMessages(chatId);
    unreadMessagesStore.setIndexedUnreadMessage(chatId);

    if (messagesStore.allIndexedChatMessages[chatId])
      messagesStore.setAllIndexedChatMessages(chatId, msg);
    else messagesStore.lastMessagesIndexed[chatId] = msg;
  });

  socket.on("server:new-room-new-message", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    if (!unreadMessagesStore) unreadMessagesStore = useUnreadMessagesStore();
    messagesStore.receivedMessages(chatId);
    unreadMessagesStore.setIndexedUnreadMessage(chatId);
    messagesStore.setAllIndexedChatMessages(chatId, [msg]);
  });

  socket.on("server:get-chat-messages", (chatId, msg) => {
    if (!messagesStore) messagesStore = useMessageStore();
    messagesStore.readMessages(chatId);
    messagesStore.setAllIndexedChatMessages(chatId, msg);
  });

  socket.on("server:messages-received", (chatsIds) => {
    if (!messagesStore) messagesStore = useMessageStore();
    messagesStore.modifyStatus(chatsIds, "received");
  });

  socket.on("server:messages-read", (chatId) => {
    if (!messagesStore) messagesStore = useMessageStore();
    messagesStore.modifyStatus(chatId, "read");
  });
}

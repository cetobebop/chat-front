import { useChatStore } from "src/stores/chat";
import { useMessageStore } from "src/stores/messages";
import { useUnreadMessagesStore } from "src/stores/unreadMessgesStore";

export function roomsEvents(socket) {
  let chatStore;
  let messageStore;
  let unreadMessagesStore;

  socket.on("server:my-rooms", (chats, indexMessageChat, unreadMessages) => {
    if (!messageStore) messageStore = useMessageStore();
    if (!chatStore) chatStore = useChatStore();
    if (!unreadMessagesStore) unreadMessagesStore = useUnreadMessagesStore();

    messageStore.receivedMessages(chats);
    messageStore.lastMessagesIndexed = indexMessageChat;
    chatStore.obtainChatInformation(chats);
    unreadMessagesStore.initIndexedUnreadMessages(unreadMessages);
  });
  socket.on("server:new-room", (chat) => {
    if (!chatStore) chatStore = useChatStore();

    chatStore.setNewChat(chat);
  });
}

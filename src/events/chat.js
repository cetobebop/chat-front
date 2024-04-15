import { useChatStore } from "src/stores/chat";

export function roomsEvents(socket) {
  const chatStore = useChatStore();

  socket.on("server:my-rooms", chatStore.obtainChatInformation);
  socket.on("server:new-room", chatStore.setNewChat);
  //   socket.on("server:user-online", userStore.obtainUsersOnline);
}

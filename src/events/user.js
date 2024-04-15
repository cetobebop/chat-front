import { useUserStore } from "src/stores/user";

export function userEvents(socket) {
  const userStore = useUserStore();

  socket.on("server:user", userStore.onConnection);
  socket.on("server:user-online", userStore.obtainUsersOnline);
}

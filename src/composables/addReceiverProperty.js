import { useUserStore } from "src/stores/user";

export function addReceiverPropertyToChat(chats) {
  const useStore = useUserStore();

  const id = useStore.myUser._id;
  for (let i = 0; i < chats.length; i++) {
    if (chats[i]?.users[0]?._id === chats[i]?.users[1]?._id)
      chats[i].receiver = chats[i]?.users[0];
    else
      chats[i].receiver = chats[i]?.users?.filter(
        (user) => user?._id !== id
      )[0];
  }

  return;
}

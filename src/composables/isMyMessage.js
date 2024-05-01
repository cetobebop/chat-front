import { useUserStore } from "src/stores/user";

export const isMyMessage = (msg) => {
  const userStore = useUserStore();
  return userStore.myUser._id === msg.sender;
};

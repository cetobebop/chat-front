import { useUserStore } from "src/stores/user";

export function addReceiverPropertyToChat(array) {
  const useStore = useUserStore();

  const id = useStore.myUser._id;
  for (let i = 0; i < array.length; i++) {
    if (array[i].users[0]._id === array[i].users[1]._id)
      array[i].receiver = array[i].users[0];
    else
      array[i].receiver = array[i].users.filter((user) => user._id !== id)[0];
  }

  return;
}

import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const myUser = ref(null);
  const otherConnectedUsers = ref(null);

  function onConnection(data) {
    myUser.value = data;
    localStorage.setItem("user", data.nanoId);
  }

  function obtainUsersOnline(data) {
    console.log(data, " usuarios ");
    otherConnectedUsers.value = indexUsers(data);
    findMe();
  }

  function indexUsers(data) {
    const objt = {};

    data.map((user) => {
      objt[user._id] = user;
    });

    return objt;
  }

  function findMe() {
    if (otherConnectedUsers.value[myUser.value._id]) {
      otherConnectedUsers.value[myUser.value._id].username = "Yo";
      return;
    }
  }

  return {
    myUser,
    otherConnectedUsers,
    onConnection,
    obtainUsersOnline,
  };
});

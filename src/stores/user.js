import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const myUser = ref(null);
    const otherConnectedUsers = ref(null);

    function onConnection(data) {
      myUser.value = data;
      localStorage.setItem("user", data.nanoId);
    }

    function obtainUsersOnline(data) {
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
      if (otherConnectedUsers.value[myUser.value?._id]) {
        otherConnectedUsers.value[myUser.value._id].username += " (Tú)";
        return;
      }
    }

    return {
      myUser,
      otherConnectedUsers,
      onConnection,
      obtainUsersOnline,
    };
  },
  { persist: true }
);

import { defineStore } from "pinia";
import { ref } from "vue";

export const useTabStore = defineStore("tabStore", () => {
  const tab = ref("users");

  function changeTab(name) {
    tab.value = name;
  }

  return {
    tab,
    changeTab,
  };
});

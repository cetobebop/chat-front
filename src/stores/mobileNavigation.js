import { defineStore } from "pinia";
import { watchEffect } from "vue";

import { ref } from "vue";

export const useMobileNavigationStore = defineStore("mobileNavigation", () => {
  const selectedView = ref("users");

  function getSelectView() {
    return selectedView.value;
  }

  function getWindowsWidth() {
    let windowHeigth;
    watchEffect(() => {
      windowHeigth = window.innerWidth;
    });
    return windowHeigth;
  }

  function changeSelectView(newView) {
    selectedView.value = newView;
  }

  function mobileViewHandler(view) {
    if (getWindowsWidth() > 600) return true;
    else if (getWindowsWidth() <= 600 && getSelectView() === view) return true;
    else if (getWindowsWidth() <= 600 && getSelectView() !== view) return false;
  }

  return {
    selectedView,
    getSelectView,
    getWindowsWidth,
    changeSelectView,
    mobileViewHandler,
  };
});

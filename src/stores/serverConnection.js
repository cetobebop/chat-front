import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useServerConnectionStore = defineStore("serverConnection", () => {
  const connectionBooleanStatus = ref(true);
  const errorConnectionStatus = ref(null);

  function setConnectionStatus(boolean) {
    connectionBooleanStatus.value = boolean;
  }

  function setErrorConnectionStatus(err) {
    errorConnectionStatus.value = err;
  }

  const getConnectionBooleanStatus = computed(() => {
    return connectionBooleanStatus.value;
  });

  const getErrorConnectionStatus = computed(() => {
    return connectionBooleanStatus.value;
  });

  return {
    setConnectionStatus,
    setErrorConnectionStatus,
    getConnectionBooleanStatus,
    getErrorConnectionStatus,
  };
});

<template>
  <div
    id="input-message-container"
    class="fixed"
    style="bottom: 0"
    ref="container"
  >
    <messages-input-image></messages-input-image>

    <messages-input-message2
      @textarea-input-height="setNewHeight"
      :chatId="chatId"
    ></messages-input-message2>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import MessagesInputMessage2 from "./MessagesInputMessage2.vue";
import MessagesInputImage from "./MessagesInputImage.vue";
import { useElmentsSizeStore } from "src/stores/elementsSize";

const emit = defineEmits(["container-input-height"]);

const props = defineProps({
  chatId: String,
});

const elmentsSizeStore = useElmentsSizeStore();

const container = ref(null);

onMounted(() => {
  watchEffect(() => {
    if (window.innerWidth > "600")
      container.value.style.width = `calc(100% - ${elmentsSizeStore.theChatContactsSize.width}px)`;
    else container.value.style.width = "100%";
  });
});

function setNewHeight(height) {
  container.value.style.height = "auto";
  container.value.style.height = height;

  emit("container-input-height", container.value.clientHeight);
}
</script>

<style scoped>
#input-message-container {
  min-width: 250px;
  background: #202c33;
  height: 60px;
  min-height: 60px;
  max-height: 170px;
  display: flex;
  align-items: center;
  padding: 0 25px 0 15px;
}

::-webkit-scrollbar-track {
  background: #2a3942;
}
</style>

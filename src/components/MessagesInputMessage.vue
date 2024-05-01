<template>
  <q-form @submit.prevent="onSubmit">
    <div
      id="input-message-container"
      class="relative-position"
      style="bottom: 0"
      ref="container"
    >
      <div style="width: 95%">
        <span class="placeholder" style="position: absolute; bottom: 10px"
          >Escribe un mensaje</span
        >
        <div
          style="position: absolute; bottom: 11px"
          @input="textAreaAdaptable()"
          ref="textarea"
          contenteditable="plaintext-only"
          class="textarea"
        ></div>
      </div>

      <q-btn
        type="submit"
        style="color: var(--primary-color)"
        class="q-ml-sm"
        unelevated
        :ripple="false"
        icon="send"
      ></q-btn>
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useMessageStore } from "src/stores/messages";

const emit = defineEmits(["container-input-height"]);

const props = defineProps({
  chatId: String,
});

const messageStore = useMessageStore();

const container = ref(null);
const textarea = ref(null);

function isEmptyTheDiv() {
  if (textarea.value.textContent) {
    textarea.value.style["z-index"] = "15";
  } else if (!textarea.value.textContent) {
    textarea.value.style["z-index"] = "0";
  }
}

onMounted(() => {
  isEmptyTheDiv();
});

function textAreaAdaptable() {
  letterLimit();
  isEmptyTheDiv();
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
  container.value.style.height = "auto";
  container.value.style.height =
    parseInt(textarea.value.scrollHeight + 20) + "px";
  emit("container-input-height", container.value.clientHeight);
}

function letterLimit() {
  if (textarea.value?.textContent?.length > 700) {
    textarea.value.textContent = textarea.value.textContent.substring(
      0,
      textarea.value?.textContent?.length - 1
    );
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(
      textarea.value.childNodes[0],
      textarea.value.textContent.length
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function onSubmit() {
  if (!textarea.value.textContent) return;
  messageStore.sentMessage(textarea.value?.textContent, props.chatId);
  textarea.value.textContent = "";
  isEmptyTheDiv();
  textAreaAdaptable();
}
</script>

<style scoped>
.textarea {
  width: 85%;
  background-color: #2a3942;
  max-height: 150px;

  border: none;
  outline: none;
  overflow: auto;
  resize: none;
  border-radius: 5px;
  padding: 9px 15px;
  color: white;
  z-index: 10;
  scrollbar-gutter: stable both-edges;
  box-sizing: border-box;
}

.placeholder {
  opacity: 0.7;
  z-index: 10;
  padding: 9px 15px;
  pointer-events: none;
}

#input-message-container {
  width: 100%;
  min-width: 250px;
  background: #202c33;
  height: 60px;
  min-height: 60px;
  max-height: 170px;
  display: flex;
  align-items: center;
  padding: 0 25px 0 25px;
}

input::placeholder {
  color: var(--primary-color);
  opacity: 0.5;
}

::-webkit-scrollbar-track {
  background: #2a3942;
}

@media (max-width: 1000px) {
  .textarea {
    width: 80%;
  }
}

@media (max-width: 800px) {
  .textarea {
    width: 75%;
  }
}

@media (max-width: 400px) {
  .textarea {
    width: 65%;
  }
}

@media (max-width: 300px) {
  .textarea {
    width: 60%;
  }
}

@media (max-width: 250px) {
  .textarea {
    width: 55%;
  }
}
</style>

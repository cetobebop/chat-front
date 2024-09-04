<template>
  <div class="container-textarea">
    <span class="placeholder" style="position: absolute; bottom: 13px"
      >Escribe un mensaje</span
    >
    <div
      style="position: absolute; bottom: 14px"
      @input="onInput"
      @paste="handlePaste"
      ref="textarea"
      contenteditable="true"
      class="textarea"
    ></div>
  </div>

  <q-btn
    @click="onSubmit"
    type="submit"
    style="color: var(--primary-color); right: 10px"
    class="absolute"
    unelevated
    :ripple="false"
    icon="send"
  ></q-btn>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { useMessageStore } from "src/stores/messages";
import { useChatStore } from "src/stores/chat";
import { scrollToTheBottom } from "src/composables/scrollToTheBottom";

const emit = defineEmits(["textarea-input-height"]);

const props = defineProps({
  chatId: String,
});

const messageStore = useMessageStore();
const chatStore = useChatStore();

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

  textarea.value.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      onSubmit();
    }
  });
});

function onInput() {
  textAreaAdaptable();
  chatStore.iAmWriting(props.chatId);
}

function textAreaAdaptable() {
  letterLimit();
  isEmptyTheDiv();
  textarea.value.style.height = "auto";
  textarea.value.style.height = textarea.value.scrollHeight + "px";
  emit(
    "textarea-input-height",
    parseInt(textarea.value.scrollHeight + 20) + "px"
  );
}

function handlePaste(event) {
  const pastedText = (event.clipboardData || window.clipboardData).getData(
    "text"
  );

  const totalLength = textarea.value?.textContent?.length + pastedText.length;

  if (totalLength > 700) {
    event.preventDefault();
  }
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
  scrollToTheBottom();
  textarea.value.focus();
}
</script>

<style scoped>
.container-textarea {
  height: 100%;
}

.textarea {
  margin-left: 5px;
  height: auto;
  width: 80%;
  background-color: #2a3942;
  max-height: 150px;
  overflow-wrap: break-word;
  border: none;
  outline: none;
  overflow-y: auto;
  resize: none;
  border-radius: 5px;
  padding: 9px 15px;
  color: white;
  z-index: 10;
  scrollbar-gutter: stable both-edges;
  box-sizing: border-box;
}

.placeholder {
  margin-left: 5px;
  opacity: 0.7;
  z-index: 10;
  padding: 9px 15px;
  pointer-events: none;
}

input::placeholder {
  color: var(--primary-color);
  opacity: 0.5;
}

::-webkit-scrollbar-track {
  background: #2a3942;
}

@media (min-width: 1200px) {
  .textarea {
    width: 83%;
  }
}

@media (max-width: 900px) {
  .textarea {
    width: 75%;
  }
}

@media (max-width: 500px) {
  .textarea {
    width: 70%;
  }
}

@media (max-width: 400px) {
  .textarea {
    width: 60%;
  }
}

@media (max-width: 300px) {
  .textarea {
    width: 54%;
  }
}
</style>

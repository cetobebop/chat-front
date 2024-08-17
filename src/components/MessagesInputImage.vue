<template>
  <div style="display: flex; justify-content: center">
    <q-btn
      style="color: var(--primary-color); margin: 0"
      class="q-ml-sm"
      unelevated
      :ripple="false"
      icon="image"
      @click="onclickBtn"
    ></q-btn>

    <messages-input-image-dialog
      v-on:emit-modal="getModalData"
    ></messages-input-image-dialog>
  </div>
</template>

<script setup>
import MessagesInputImageDialog from "./MessagesInputImageDialog.vue";

import { ref } from "vue";

const modal = ref(null);

function getModalData(myModal) {
  modal.value = myModal;
}

function onclickBtn() {
  modal.value.style.display = "block";
}
</script>

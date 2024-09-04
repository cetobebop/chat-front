<template>
  <div ref="myModal" class="modal">
    <form ref="form" @submit.prevent="onSubmit">
      <div class="modal-content">
        <span class="close" @click="onClose">&times;</span>
        <img :src="imageUrl" v-if="imageUrl" />
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          ref="file"
          @input="onFilePicked"
        />
        <label for="image" v-if="!imageUrl">
          <q-icon name="image" style="font-size: 15em; cursor: pointer" />
          <span style="font-size: 3em; width: 100%; text-align: center"
            >Elige una imagen</span
          >
        </label>
        <q-btn
          :loading="loading"
          style="margin-top: 8px"
          type="submit"
          color="teal-9"
          text-color="dark"
          v-show="imageUrl"
          :ripple="false"
          icon="send"
        ></q-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";

import { useMessageStore } from "src/stores/messages";
import { useUserStore } from "src/stores/user";
import { useChatStore } from "src/stores/chat";

const myModal = ref(null);
const form = ref(null);
const file = ref(null);
const imageUrl = ref(null);
const imageUrlToSave = ref(null);
const loading = ref(false);

const messageStore = useMessageStore();
const userStore = useUserStore();
const chatStore = useChatStore();

const emits = defineEmits(["emitModal"]);

async function onSubmit() {
  const senderId = userStore.myUser.nanoId;
  const receiverId = messageStore.receiver;

  const formData = new FormData(form.value);
  formData.append("sender", senderId);
  formData.append("receiver", receiverId);

  try {
    loading.value = true;
    const res = await api("/images/image", {
      method: "post",
      data: formData,
    });

    messageStore.addImageToIndexedMessages(
      imageUrlToSave.value,
      chatStore.chatSelect?.chat?._id
    );

    messageStore.changeMessageStatus(chatStore.chatSelect?.chat?._id);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
    myModal.value.style.display = "none";
    imageUrl.value = null;
  }
}

function onClose() {
  myModal.value.style.display = "none";
  imageUrl.value = null;
}

function onFilePicked(event) {
  const files = event.target.files;
  const file = files[0];
  try {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      imageUrl.value = fileReader.result;
      imageUrlToSave.value = fileReader.result;
    });
    fileReader.readAsDataURL(file);
  } catch (error) {}
}

onMounted(() => {
  window.onclick = function (event) {
    if (event.target == myModal.value) {
      myModal.value.style.display = "none";
      imageUrl.value = null;
    }
  };

  emits("emitModal", myModal.value);
});
</script>

<style scoped>
#image {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  color: #aaaaaa;
  border-radius: 10px;
}

label:hover {
  color: #000;
  background: #777;
  transition: 0.2s;
}

img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: #444;
  margin: auto;
  padding: 35px 20px 20px;
  width: 60%;
  height: 600px;
}

.close {
  position: absolute;
  color: #aaaaaa;
  right: 25px;
  top: 6px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

@media (max-width: 1100px) {
  .modal-content {
    width: 70%;
  }
}

@media (max-width: 900px) {
  .modal-content {
    width: 80%;
  }
}

@media (max-width: 700px) {
  .modal {
    padding-top: 60px;
  }

  .modal-content {
    width: 90%;
    height: calc(600px - 60px);
  }
}

@media (max-width: 500px) {
  .modal-content {
    width: 100%;
    padding: 35px 5px 5px;
  }
}
</style>

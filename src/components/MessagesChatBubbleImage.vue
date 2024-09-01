<template>
  <div style="">
    <div class="msg izq first-izq" v-if="!sent && first">
      <span class="triangle-izq"></span>
      <div ref="container_image" class="container-img">
        <img ref="image" :src="urlImage" />
      </div>
      <div>
        <span class="brand-izq"
          ><span class="timestamp timestamp-izq">
            {{ messageDate(date) }}
          </span></span
        >
      </div>
    </div>

    <div class="msg izq" v-if="!sent && !first">
      <div ref="container_image" class="container-img">
        <img ref="image" :src="urlImage" />
      </div>
      <div>
        <span class="brand-izq"
          ><span class="timestamp timestamp-izq">
            {{ messageDate(date) }}
          </span></span
        >
      </div>
    </div>

    <div class="msg der first-der" v-if="sent && first">
      <span class="triangle-der"> </span>
      <div ref="container_image" class="container-img">
        <img ref="image" :src="urlImage" />
      </div>
      <div>
        <span class="brand-der">
          <span class="timestamp timestamp-der">{{ messageDate(date) }}</span>
          <messages-message-status
            class="status"
            :status="status"
          ></messages-message-status>
        </span>
      </div>
    </div>

    <div class="msg der" v-if="sent && !first">
      <div ref="container_image" class="container-img">
        <img ref="image" :src="urlImage" />
      </div>
      <div style="">
        <span class="brand-der">
          <span class="timestamp timestamp-der">{{ messageDate(date) }}</span>
          <messages-message-status
            class="status"
            :status="status"
          ></messages-message-status
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "moment";
import MessagesMessageStatus from "./MessagesMessageStatus.vue";

defineProps({
  sent: Boolean,
  urlImage: String,
  status: String,
  first: Boolean,
  date: String,
});

const container_image = ref(null);
const image = ref(null);

const messageDate = (date) => {
  return moment(date).format("LT").replace("AM", "a.m.").replace("PM", "p.m.");
};

onMounted(() => {
  image.value.onload = () => {
    if (container_image.value?.style)
      container_image.value.style.height = image.value.clientHeight + "px";
  };
});
</script>

<style scoped>
img {
  width: 100%;
}

.container-img {
  overflow: hidden;
  max-width: 400px;
  max-height: 24rem;
  border-radius: 5px;
}

.msg {
  position: relative;
  width: 45%;
  max-width: 25rem;
  max-height: 25rem;

  color: #fff;
  padding: 4px;
  border-radius: 10px;
  margin-top: 2px;
  cursor: pointer;
}

.izq {
  background: var(--other-message-color);
  margin-left: 20px;
  float: left;
}

.der {
  background: var(--my-message-color);
  float: right;
  margin-right: 20px;
}

.first-izq {
  border-radius: 0 10px 10px;
  margin-top: 8px;
}

.first-der {
  border-radius: 10px 0px 10px 10px;
  margin-top: 8px;
}

.triangle-izq {
  width: 10px;
  height: 10px;
  position: absolute;
  left: -9px;
  top: 0;
  background: var(--other-message-color);
  display: inline-block;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  border-radius: 20px 0 0 40px;
}

.triangle-der {
  width: 10px;
  height: 10px;
  position: absolute;
  right: -9px;
  top: 0;
  background: var(--my-message-color);
  display: inline-block;
  clip-path: polygon(0 100%, 0 0, 100% 0);
  border-radius: 0px 20px 40px 0px;
}

.status {
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: #fff;
}

.timestamp {
  position: absolute;
  bottom: 5px;
  opacity: 0.6;
  font-weight: 300;
  font-size: 0.8em;
  color: #fff;
}

.timestamp-izq {
  right: 10px;
}

.timestamp-der {
  right: 30px;
}
.brand-izq {
  background-image: linear-gradient(
    to top,
    rgba(15, 14, 14, 0.651),
    transparent
  );
  position: absolute;
  bottom: 4px;
  display: block;
  width: calc(100% - 8px);
  height: 40px;
  right: 4px;
}

.brand-der {
  position: absolute;
  border-radius: 5px;
  bottom: 4px;
  display: block;
  width: calc(100% - 8px);
  height: 40px;
  background-image: linear-gradient(
    to top,
    rgba(15, 14, 14, 0.651),
    transparent
  );
}

@media (max-width: 800px) {
  .msg {
    width: 60%;
  }
}

@media (max-width: 600px) {
  .msg {
    width: 75%;
  }
}
</style>

<template>
  <div style="">
    <div class="msg izq first-izq" v-if="!sent && first">
      <span class="triangle-izq"></span>
      {{ content }}
      <div>
        <span class="timestamp brand-der">{{ messageDate(date) }}</span>
      </div>
    </div>

    <div class="msg izq" v-if="!sent && !first">
      {{ content }}
      <div>
        <span class="timestamp brand-der">{{ messageDate(date) }}</span>
      </div>
    </div>

    <div class="msg der first-der" v-if="sent && first">
      <span class="triangle-der"> </span>
      {{ content }}
      <div>
        <span class="brand-der">
          <span class="timestamp" style="margin-right: 3px">{{
            messageDate(date)
          }}</span>
          <messages-message-status :status="status"></messages-message-status
        ></span>
      </div>
    </div>

    <div class="msg der" v-if="sent && !first">
      {{ content }}
      <div>
        <span class="brand-der">
          <span class="timestamp" style="margin-right: 3px">{{
            messageDate(date)
          }}</span>
          <messages-message-status :status="status"></messages-message-status
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import MessagesMessageStatus from "./MessagesMessageStatus.vue";

defineProps({
  sent: Boolean,
  content: String,
  status: String,
  first: Boolean,
  date: String,
});

const messageDate = (date) => {
  return moment(date).format("LT").replace("AM", "a.m.").replace("PM", "p.m.");
};
</script>

<style scoped>
.msg {
  position: relative;
  word-wrap: break-word;
  width: fit-content;
  max-width: 60%;
  color: #fff;
  padding: 8px;
  border-radius: 10px;
  margin-top: 2px;
  clear: both;
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

.timestamp {
  opacity: 0.6;
  font-weight: 300;
  font-size: 0.8em;
}
.brand-der {
  float: right;
}
</style>

<template>
  <q-inner-loading>
    <q-avatar size="15em">
      <img :src="src" style="opacity: 1" />
    </q-avatar>
    <span style="font-size: 1.6em; margin-top: 1em; text-align: center">{{
      msg
    }}</span>
  </q-inner-loading>
</template>

<script setup>
defineProps({
  src: String,
  msg: String,
});
</script>

<style scoped>
.q-inner-loading {
  background: #000;
  opacity: 0.7;
}

@media (max-width: 800px) {
  span {
    font-size: 1em;
    padding: 0 5px 0 5px;
  }
}
</style>

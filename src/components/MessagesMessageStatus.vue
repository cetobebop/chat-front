<template>
  <span class="container-icons">
    <q-icon v-if="status === undefined" class="icon" name="schedule" />
    <q-icon v-if="status === `sent`" class="icon" name="check" />
    <q-icon
      v-if="status === `received`"
      class="icon received"
      name="done_all"
    />
    <q-icon
      v-if="status === `read`"
      color="blue-5"
      class="icon read"
      name="done_all"
    />
  </span>
</template>

<script setup>
defineProps({
  status: String,
});
</script>

<style scoped>
.container-icons {
  display: inline-block;
  margin-right: 3px;
}

.icon {
  opacity: 0.6;
  font-weight: 300;
  font-size: 1.1em;
}
</style>

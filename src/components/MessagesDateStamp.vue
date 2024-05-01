<template>
  <div class="timeStamp">
    {{ dateStamp(date) }}
  </div>
</template>

<script setup>
import { dateDifferenceFromNow } from "src/composables/dateDifferenceFromNow";

const props = defineProps({
  date: String,
  i: Number,
  chatId: String,
});

const dateStamp = (date) => {
  const result = dateDifferenceFromNow(date);
  return result.toUpperCase();
};
</script>

<style scoped>
.timeStamp {
  padding: 5px 12px;
  border-radius: 10px;
  background: var(--time-stamp);
  color: #8696a0;
  margin: 8px auto;
  font-size: 0.9em;
}
</style>

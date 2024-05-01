<template>
  <div
    style="
      background: var(--panel-header-background);
      height: 60px;
      padding: 7px 0 7px 10px;
    "
    class="row items-center q-pr-sm"
  >
    <q-btn
      flat
      round
      color="gray-10"
      icon="arrow_back"
      v-if="arrowBack"
      class="btn"
      @click="onClick"
    />
    <div style="padding: 0 16px 0 5px">
      <q-avatar size="lg">
        <img :src="avatar" v-if="avatar" />
      </q-avatar>
    </div>
    <div v-if="title" style="font-size: 1.4em; width: fit-content">
      {{ title }}
    </div>
  </div>
</template>

<script setup>
import { useMobileNavigationStore } from "src/stores/mobileNavigation";

defineProps({
  title: String,
  avatar: String,
  arrowBack: Boolean,
});

const movileNavigationStore = useMobileNavigationStore();

function onClick() {
  movileNavigationStore.changeSelectView("users");
}
</script>

<style scoped>
@media (min-width: 600px) {
  .btn {
    display: none;
  }
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition :enter-active-class="route.meta.transition">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { socket } from "src/socket";
import { useRoute } from "vue-router";

const route = useRoute();

socket.connect();
</script>

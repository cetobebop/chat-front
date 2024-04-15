<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { socket } from "src/socket";

socket.connect();
</script>

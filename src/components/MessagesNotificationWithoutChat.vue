<template>
  <div class="container">
    <q-avatar size="15em">
      <img :src="tortugaImageUrl" />
    </q-avatar>
    <span>¡Sin mensajes, escribe algo a este completo desconocido!</span>
  </div>
</template>

<script setup>
import tortugaImageUrl from "../../public/gif/tortuga_bailando.gif";
</script>

<style scoped>
.container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

span {
  display: inline-block;
  margin-top: 2em;
  font-size: 1.5em;
  opacity: 0.4;
}

@media (max-width: 800px) {
  span {
    font-size: 1.3em;
    opacity: 0.4;
    text-align: center;
  }
}
</style>

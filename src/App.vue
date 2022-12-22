<script setup lang="ts">
import BarcodeReader from "./components/BarcodeReader.vue";
</script>

<template>
  <header class="container"><h1>Barcode Reader</h1></header>
  <main class="container">
    <BarcodeReader />
  </main>
</template>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
}
</style>

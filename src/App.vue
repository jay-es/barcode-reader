<script setup lang="ts">
import { onMounted, ref } from "vue";
const video = ref<HTMLVideoElement>();

onMounted(async () => {
  if (!video.value) return;

  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "environment" },
  });
});
</script>

<template>
  <video ref="video" width="360" height="240" autoplay />
</template>

<style scoped>
video {
  background-color: #eee;
}
</style>

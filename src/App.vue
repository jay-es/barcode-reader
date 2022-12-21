<script setup lang="ts">
import { onMounted, ref } from "vue";

const WIDTH = 180;
const HEIGHT = 320;

const video = ref<HTMLVideoElement>();
const canvas = ref<HTMLCanvasElement>();

onMounted(async () => {
  if (!video.value) return;

  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: "environment" },
  });
});

setInterval(() => {
  if (!video.value || !canvas.value) return;
  const context = canvas.value.getContext("2d");
  context?.drawImage(video.value, 0, 0, WIDTH, HEIGHT);

  // const data = canvas.value.toDataURL("image/png");
}, 1000);
</script>

<template>
  <video ref="video" :width="WIDTH" :height="HEIGHT" autoplay />
  <canvas ref="canvas" :width="WIDTH" :height="HEIGHT" />
</template>

<style scoped>
video {
  background-color: #eee;
}
</style>

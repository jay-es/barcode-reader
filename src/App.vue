<script setup lang="ts">
import { onMounted, ref } from "vue";

const video = ref<HTMLVideoElement>();
const barcode = ref("");

onMounted(async () => {
  if (!video.value) return;

  video.value.srcObject = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "environment", // 背面カメラ
    },
  });
});

setInterval(async () => {
  if (!video.value || barcode.value) return;

  const detector = new (window as any).BarcodeDetector({ formats: ["ean_13"] });
  const result = await detector.detect(video.value);

  if (result?.[0]?.rawValue) {
    barcode.value = result[0].rawValue;
    video.value.pause();
  }
}, 1000);

const reset = () => {
  barcode.value = "";
  video.value?.play();
};
</script>

<template>
  barcode: {{ barcode }}<br />
  <video ref="video" width="240" autoplay />
  <button @click="reset()">reset</button>
</template>

<style scoped>
video {
  display: block;
}
</style>

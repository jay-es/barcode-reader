<script setup lang="ts">
import { onMounted, ref } from "vue";

const video = ref<HTMLVideoElement>();
const barcodes = ref<string[]>([]);

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
  if (!video.value || barcodes.value.length) return;

  const detector = new (window as any).BarcodeDetector({ formats: ["ean_13"] });
  const result: any[] = await detector.detect(video.value);

  if (result.length) {
    barcodes.value = result.map((v) => v.rawValue);
    video.value.pause();
  }
}, 1000);

const reset = () => {
  barcodes.value = [];
  video.value?.play();
};
</script>

<template>
  <video ref="video" width="240" autoplay />

  <ul>
    <li v-for="v in barcodes" :key="v">
      <a :href="`https://www.amazon.co.jp/s?k=${v}`" target="_blank">
        barcode: {{ v }}
      </a>
    </li>
  </ul>

  <button v-show="barcodes.length" @click="reset()">reset</button>
</template>

<style scoped>
video {
  display: block;
  margin: 0.75rem auto;
}
</style>

import { memo } from "preact/compat";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

import { BarcodeList } from "@/components/BarcodeList";
import { detectBarcode } from "@/lib/detectBarcode";
import { getUserMedia } from "@/lib/getUserMedia";

import styles from "./BarcodeReader.module.css";

const useVideo = () => {
  const video = useRef<HTMLVideoElement>(null);

  // カメラ入力を video に
  useEffect(() => {
    if (!video.current) return;

    getUserMedia().then((stream) => {
      if (!video.current) return;
      video.current.srcObject = stream;
    });
  }, [video]);

  return video;
};

export const BarcodeReader = memo(() => {
  const video = useVideo();
  const [barcodes, setBarcodes] = useState<string[]>([]);

  // video からバーコード読み取り
  useEffect(() => {
    if (!video.current || barcodes.length) return;

    const timerId = setInterval(async () => {
      if (!video.current) return;

      const result = await detectBarcode(video.current);

      if (result.length) {
        setBarcodes(result);
        video.current.pause();
      }
    }, 800);

    return () => clearInterval(timerId);
  }, [video, barcodes]);

  const reset = useCallback(() => {
    setBarcodes([]);
    video.current?.play();
  }, [video, setBarcodes]);

  return (
    <>
      <video ref={video} class={styles.video} autoPlay />

      <BarcodeList barcodes={barcodes} />

      <button onClick={reset} disabled={!barcodes.length}>
        reset
      </button>
    </>
  );
});

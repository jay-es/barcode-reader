import { useEffect, useRef, useState } from "preact/hooks";
import { detectBarcode } from "../lib/detectBarcode";
import { getUserMedia } from "../lib/getUserMedia";
import { BarcodeList } from "./BarcodeList";
import style from "./BarcodeReader.module.css";

export function BarcodeReader() {
  const video = useRef<HTMLVideoElement>(null);
  const [barcodes, setBarcodes] = useState<string[]>([]);

  // カメラ入力を video に
  useEffect(() => {
    if (!video.current) return;

    getUserMedia().then((stream) => {
      if (!video.current) return;
      video.current.srcObject = stream;
    });
  }, [video]);

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
    }, 1000);

    return () => clearInterval(timerId);
  }, [video, barcodes]);

  const reset = () => {
    setBarcodes([]);
    video.current?.play();
  };

  return (
    <>
      <video ref={video} class={style.video} width="240" autoPlay />

      <BarcodeList barcodes={barcodes} />

      <button onClick={reset} disabled={!barcodes.length}>
        reset
      </button>
    </>
  );
}

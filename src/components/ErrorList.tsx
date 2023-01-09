import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { getUserMedia } from "../lib/getUserMedia";
import style from "./ErrorList.module.css";

const API_ERROR = "This browser does not support the Barcode Detection API.";
const CAMERA_ERROR = "No camera detected.";

export const ErrorList = memo(() => {
  const apiError = window.BarcodeDetector ? "" : API_ERROR;
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    getUserMedia().then((stream) => {
      setCameraError(stream ? "" : CAMERA_ERROR);
    });
  }, [setCameraError]);

  // エラーがなければ非表示
  if (!apiError && !cameraError) return null;

  return (
    <ul class={style.list}>
      {apiError && <li>{apiError}</li>}
      {cameraError && <li>{cameraError}</li>}
    </ul>
  );
});

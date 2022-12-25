import { memo } from "preact/compat";
import { useEffect, useState } from "preact/hooks";

import { getUserMedia } from "../lib/getUserMedia";

export const Errors = memo(() => {
  const apiError = window.BarcodeDetector
    ? ""
    : "This browser does not support the Barcode Detection API.";
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    getUserMedia().then((stream) => {
      setCameraError(stream ? "" : "No camera detected.");
    });
  }, [setCameraError]);

  // エラーがなければ非表示
  if (!apiError && !cameraError) return null;

  return (
    <ul>
      {apiError && <li>{apiError}</li>}
      {cameraError && <li>{cameraError}</li>}
    </ul>
  );
});
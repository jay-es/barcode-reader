export const getUserMedia = (): Promise<MediaStream | null> =>
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        facingMode: "environment", // 背面カメラ
        aspectRatio: 0.5,
      },
    })
    .catch(() => null);

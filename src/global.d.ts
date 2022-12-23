// BarcodeDetector の型を追加
interface Window {
  BarcodeDetector: new (options: { formats: string[] }) => {
    detect(el: HTMLVideoElement): Promise<{ rawValue: string }[]>;
  };
}

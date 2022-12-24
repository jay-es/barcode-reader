export const detectBarcode = async (el: HTMLElement): Promise<string[]> => {
  if (!window.BarcodeDetector) return [];

  const detector = new window.BarcodeDetector({
    formats: ["ean_13"],
  });
  const result = await detector.detect(el);

  return result.map(({ rawValue }) => rawValue);
};

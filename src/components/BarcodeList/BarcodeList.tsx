import { memo } from "preact/compat";

import styles from "./BarcodeList.module.css";

type Props = {
  barcodes: string[];
};

export const BarcodeList = memo<Props>(({ barcodes }) => (
  <ul class={styles.list}>
    {barcodes.map((code) => (
      <li key={code}>
        <a
          href={`https://www.amazon.co.jp/s?k=${code}`}
          target="_blank"
          rel="noreferrer"
        >
          {code}
        </a>
      </li>
    ))}
  </ul>
));

import { memo } from "preact/compat";

import * as style from "./BarcodeList.css";

type Props = {
  barcodes: string[];
};

export const BarcodeList = memo<Props>(({ barcodes }) => (
  <ul class={style.list}>
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

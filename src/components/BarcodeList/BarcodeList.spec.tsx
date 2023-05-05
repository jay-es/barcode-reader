import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";

import { BarcodeList } from "./BarcodeList";

describe("BarcodeList", () => {
  it("リストがなければ li はレンダリングされない", () => {
    render(<BarcodeList barcodes={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("barcodes の数だけ li が表示される", () => {
    const barcodes = ["foo", "bar", "baz"];
    render(<BarcodeList barcodes={barcodes} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(3);
  });
});

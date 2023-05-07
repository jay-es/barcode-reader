import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as detectBarcode from "../../lib/detectBarcode";
import * as getUserMedia from "../../lib/getUserMedia";
import { BarcodeReader } from "./BarcodeReader";

describe("BarcodeReader", () => {
  beforeEach(() => {
    vi.spyOn(getUserMedia, "getUserMedia").mockResolvedValueOnce(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("video が表示される", () => {
    const { container } = render(<BarcodeReader />);

    expect(container.querySelector("video")).toBeInTheDocument();
  });

  it("ボタンが表示され、非活性", () => {
    render(<BarcodeReader />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("バーコード検出後ボタン活性化、その後クリックで非活性化", async () => {
    vi.spyOn(detectBarcode, "detectBarcode").mockResolvedValueOnce(["foo"]);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockReturnValue();

    render(<BarcodeReader />);
    const button = screen.getByRole("button");

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});

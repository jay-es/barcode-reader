import { render, screen, waitFor, within } from "@testing-library/preact";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as lib from "@/lib/getUserMedia";

import { API_ERROR, CAMERA_ERROR, ErrorList } from "./ErrorList";

describe("ErrorList", () => {
  const setupMock = (hasBarcodeDetector: boolean, hasCamera: boolean) => {
    vi.stubGlobal("BarcodeDetector", hasBarcodeDetector);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(lib, "getUserMedia").mockResolvedValueOnce(hasCamera as any);
  };
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("エラーがなければレンダリングされない", () => {
    setupMock(true, true);
    render(<ErrorList />);

    expect(screen.queryByRole("list")).toBeNull();
  });

  it("BarcodeDetector がない", () => {
    setupMock(false, true);
    render(<ErrorList />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
    expect(within(list).queryAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(API_ERROR)).toBeInTheDocument();
  });

  it("カメラがない", async () => {
    setupMock(true, false);
    render(<ErrorList />);

    const list = await screen.findByRole("list"); // getBy + waitFor

    expect(list).toBeInTheDocument();
    expect(within(list).queryAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(CAMERA_ERROR)).toBeInTheDocument();
  });

  it("両方のエラー", async () => {
    setupMock(false, false);
    render(<ErrorList />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
    await waitFor(() => {
      expect(within(list).queryAllByRole("listitem")).toHaveLength(2);
    });
    expect(screen.getByText(API_ERROR)).toBeInTheDocument();
    expect(screen.getByText(CAMERA_ERROR)).toBeInTheDocument();
  });
});

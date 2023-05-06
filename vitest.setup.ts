import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/preact";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

// Vitest で globals:false の場合は自動でクリーンアップされない
afterEach(cleanup);

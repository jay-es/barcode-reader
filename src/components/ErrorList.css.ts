import { globalStyle, style } from "@vanilla-extract/css";

export const list = style({});

globalStyle(`${list} > li`, {
  color: "var(--form-element-invalid-border-color)",
});

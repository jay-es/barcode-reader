import { globalStyle, style } from "@vanilla-extract/css";

export const list = style({});

globalStyle(`${list} > li`, {
  marginBottom: "calc(var(--typography-spacing-vertical) / 2)",
});

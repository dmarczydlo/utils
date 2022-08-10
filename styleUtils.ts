import { css, FlattenSimpleInterpolation } from "styled-components";

type JustifyContentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type AlignItemsType = "center" | "start" | "end" | "stretch" | "baseline";

type FlexDirectionType = "row" | "column";

export const flexFn = (
  justifyContent: JustifyContentType = "center",
  alignItems: AlignItemsType = "center",
  flexDirection: FlexDirectionType = "row"
): FlattenSimpleInterpolation => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${flexDirection};
`;

const trimEnd = (str: string): string => str.replace(/\s+$/, "");

export const pxToRem = (px: string | string[] | number | number[]): string => {
  let parsedPx = px as string[];
  if (!Array.isArray(px)) {
    parsedPx = [px as string];
  }
  let remResult = "";
  parsedPx.forEach((pxItem) => {
    if (pxItem === "auto") {
      remResult += "auto ";
      return;
    }
    const rem = parseFloat(pxItem) / 16;
    remResult += `${rem.toFixed(4)}rem `;
  });
  return trimEnd(remResult);
};

export const breakpoints = {
  xxl: pxToRem(1440),
  xl: pxToRem(1200),
  l: pxToRem(992),
  m: pxToRem(768),
  s: pxToRem(576),
  xs: pxToRem(375),
};

type cssParams = Parameters<typeof css>;
const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;

export const respondTo = keys.reduce((accumulator, label) => {
  accumulator[label] = (...args: cssParams) => css`
    @media (min-width: ${breakpoints[label]}) {
      ${css(...args)};
    }
  `;

  return accumulator;
}, {} as Record<keyof typeof breakpoints, Function>);

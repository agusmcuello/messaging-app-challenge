export type HttpProgressEvent = (
  percentage: number,
  loaded: number,
  total: number,
  bytes: number
) => void;

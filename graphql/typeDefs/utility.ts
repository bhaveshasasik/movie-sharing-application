type Optional<T> = T | null | undefined;
type UnpackedPromise<T> = T extends Promise<infer U> ? U : T;

export type {
  Optional,
  UnpackedPromise
};
export interface ParserCallback<T> {
  (value: unknown): T | undefined;
}

export type TError = {
  path: string | number;
  message: string;
};

export type TErrorResponse = {
  status: number;
  message: string;
  errorSources: TError[];
};

import type { SWRResponse } from "swr";
import type { SWRInfiniteResponse } from "swr/infinite";

export type SWRHookResponse<DataType, ErrorType = boolean> = {
  isLoading: boolean;
  data?: DataType;
  isError?: ErrorType;
  mutate: SWRResponse<DataType, ErrorType>["mutate"];
};

export type SWRHookWithMutate<DataType, ErrorType = boolean> = SWRHookResponse<
  DataType,
  ErrorType
> & {
  mutate: SWRResponse<DataType, ErrorType>["mutate"];
};

export type SWRInfiniteHookResponse<DataType> = Pick<
  SWRInfiniteResponse,
  "size" | "setSize" | "mutate"
> & {
  isLoading: boolean;
  isError: unknown;
  data: Array<DataType>;
};
